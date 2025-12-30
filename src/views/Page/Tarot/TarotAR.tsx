import React, { useEffect, useRef } from "react";
import * as THREE_TYPES from "three";
import { CardData } from "../../types/tarot";
import "./TarotAR.scss";
import {
  TAROT_CONFIG as CONFIG,
  READING_CONTEXTS,
  SCENE_CONFIG,
  TAROT_DATA,
} from "./constants";

// Types for CDN-loaded libraries
declare global {
  interface Window {
    THREE: typeof THREE_TYPES;
    TWEEN: {
      update: (time?: number) => boolean;
      Tween: any; // Tween constructor is harder to type precisely without full library
      Easing: any;
    };
  }
}

// Link Google Fonts for premium look
const fontLink = document.createElement("link");
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

const TarotAR: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.crossOrigin = "anonymous";
        script.onload = () => resolve();
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    let cleanupFn: (() => void) | undefined;

    const initTarot = async () => {
      try {
        await loadScript(
          "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"
        );
        await loadScript(
          "https://cdnjs.cloudflare.com/ajax/libs/tween.js/18.6.4/tween.umd.js"
        );

        if (containerRef.current) {
          cleanupFn = initTarotApp(containerRef.current, () =>
            setIsLoading(false)
          );
        }
      } catch (error) {
        console.error("Failed to load scripts:", error);
      }
    };

    initTarot();

    return () => {
      if (cleanupFn) cleanupFn();
    };
  }, []);

  return (
    <div className="tarot-container">
      <div ref={containerRef} id="canvas-container" />

      <div id="ui-layer">
        <div id="counter">0 / 3</div>
        <div id="guide-text">Chọn 3 lá bài để xem định mệnh của bạn</div>

        <div id="result-modal">
          <div className="modal-header">
            <span className="sparkle">✦</span>
            <h2>Lời Tiên Tri</h2>
            <span className="sparkle">✦</span>
          </div>
          <div id="final-reading"></div>
          <button
            className="restart-btn"
            onClick={() => window.location.reload()}
          >
            Trải Bài Mới
          </button>
        </div>
      </div>

      {isLoading && (
        <div id="loading">
          <div className="loader-content">
            <div className="loader-icon">✦</div>
            <div className="loader-text">READING THE STARS...</div>
          </div>
        </div>
      )}
    </div>
  );
};

interface Explosion {
  mesh: THREE_TYPES.Points;
  velocities: number[];
  age: number;
}

function initTarotApp(container: HTMLDivElement, onReady: () => void) {
  const THREE = window.THREE;
  const TWEEN = window.TWEEN;

  let scene: THREE_TYPES.Scene;
  let camera: THREE_TYPES.PerspectiveCamera;
  let renderer: THREE_TYPES.WebGLRenderer;
  let animationId: number;
  let isDisposed = false;
  let explosionMaterial: THREE_TYPES.PointsMaterial;

  let cardGroup: THREE_TYPES.Group;
  let textureLoader: THREE_TYPES.TextureLoader;
  let raycaster: THREE_TYPES.Raycaster;
  let mouse: THREE_TYPES.Vector2;
  let starFieldMesh: THREE_TYPES.InstancedMesh;
  let explosions: Explosion[] = [];
  let storedCards: THREE_TYPES.Mesh[] = [];
  let inspectingCard: THREE_TYPES.Mesh | null = null;
  let hoveredCard: THREE_TYPES.Mesh | null = null;
  let isGameActive = true;
  let particleTexture: THREE_TYPES.Texture;

  function shuffleArray<T>(array: T[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function generateParticleTexture(): THREE_TYPES.Texture {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d")!;
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, "rgba(255, 255, 255, 1)");
    grad.addColorStop(0.4, "rgba(255, 255, 255, 0.5)");
    grad.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
    const tex = new THREE.Texture(canvas);
    tex.needsUpdate = true;
    return tex;
  }

  function init() {
    scene = new THREE.Scene();
    if (SCENE_CONFIG.fog) {
      scene.fog = new THREE.FogExp2(
        SCENE_CONFIG.fog.color,
        SCENE_CONFIG.fog.density
      );
    }

    camera = new THREE.PerspectiveCamera(
      SCENE_CONFIG.camera.fov,
      container.clientWidth / container.clientHeight,
      SCENE_CONFIG.camera.near,
      SCENE_CONFIG.camera.far
    );
    camera.position.set(0, 0, SCENE_CONFIG.camera.position.z);

    // TỐI ƯU CẤP 4: Kiểm soát Pixel Ratio và Power Preference để tiết kiệm GPU
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance", // Ưu tiên dùng GPU rời nếu có
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Giới hạn tối đa là 2 để không quá tải
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(
      SCENE_CONFIG.lighting.ambient.color,
      SCENE_CONFIG.lighting.ambient.intensity
    );
    scene.add(ambient);

    const spotLight = new THREE.SpotLight(
      SCENE_CONFIG.lighting.spot.color,
      SCENE_CONFIG.lighting.spot.intensity
    );
    spotLight.position.set(
      SCENE_CONFIG.lighting.spot.position.x,
      SCENE_CONFIG.lighting.spot.position.y,
      SCENE_CONFIG.lighting.spot.position.z
    );
    scene.add(spotLight);

    textureLoader = new THREE.TextureLoader();
    textureLoader.setCrossOrigin("anonymous");
    particleTexture = generateParticleTexture();

    shuffleArray(TAROT_DATA);
    createCards();
    createBackgroundStars();

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);

    // Fade out loading screen after a delay
    setTimeout(onReady, 2500);
  }

  function createBackgroundStars() {
    const count = SCENE_CONFIG.stars.count;

    // TỐI ƯU CẤP 3: Sử dụng InstancedMesh để vẽ 1200 vật thể 3D chỉ với 1 Draw Call
    // Thay vì dùng Point (2D), ta dùng Box (3D) để trông xịn hơn mà vẫn cực nhẹ
    const geo = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const mat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    starFieldMesh = new THREE.InstancedMesh(geo, mat, count);

    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      dummy.position.set(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 50 - 10
      );
      dummy.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      const scale = Math.random() * 0.5 + 0.1;
      dummy.scale.set(scale, scale, scale);

      // Tính toán ma trận vị trí cho từng bản sao (Instance)
      dummy.updateMatrix();
      starFieldMesh.setMatrixAt(i, dummy.matrix);
    }

    scene.add(starFieldMesh);
  }

  function createCards() {
    cardGroup = new THREE.Group();
    scene.add(cardGroup);

    const geo = new THREE.BoxGeometry(
      CONFIG.cardWidth,
      CONFIG.cardHeight,
      0.02
    );

    const backTex = textureLoader.load(
      require("../../../assets/png/back.png"),
      undefined,
      undefined,
      (err: unknown) => {
        console.warn("Failed to load back texture", err);
      }
    );

    const matEdge = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.8,
      roughness: 0.2,
    });

    const matBack = new THREE.MeshStandardMaterial({
      map: backTex,
      color: 0xffffff,
    });

    TAROT_DATA.forEach((data: CardData, i: number) => {
      const frontTex = textureLoader.load(
        data.url,
        undefined,
        undefined,
        (err: unknown) => {
          console.warn(`Failed to load texture: ${data.url}`, err);
        }
      );

      const matFront = new THREE.MeshStandardMaterial({ map: frontTex });

      const materials = [matEdge, matEdge, matEdge, matEdge, matBack, matFront];
      const card = new THREE.Mesh(geo, materials);

      const layout = CONFIG.spreadLayout!;
      const totalRows = Math.ceil(TAROT_DATA.length / layout.cardsPerRow);
      const row = Math.floor(i / layout.cardsPerRow);
      const col = i % layout.cardsPerRow;

      const totalWidth = (layout.cardsPerRow - 1) * layout.cardSpacing;
      const totalHeight = (totalRows - 1) * layout.rowSpacing;

      const x = col * layout.cardSpacing - totalWidth / 2;
      const y = -row * layout.rowSpacing + totalHeight / 2;

      const normalizedCol = col / (layout.cardsPerRow - 1) - 0.5;
      const arcOffset =
        layout.arcHeight * (1 - 4 * normalizedCol * normalizedCol);

      card.position.set(x, y + arcOffset, layout.startZ);
      card.rotation.set(0, 0, 0);
      card.userData = { id: i, data: data, isPicked: false };
      cardGroup.add(card);
    });
  }

  function createExplosion(position: THREE_TYPES.Vector3) {
    if (!explosionMaterial) {
      explosionMaterial = new THREE.PointsMaterial({
        size: 0.2,
        map: particleTexture,
        transparent: true,
        opacity: 0.9,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        color: 0xffffff,
      });
    }

    const particleCount = 150;
    const geo = new THREE.BufferGeometry();
    const positions: number[] = [];
    const velocities: number[] = [];
    const sizes: number[] = [];

    for (let i = 0; i < particleCount; i++) {
      positions.push(position.x, position.y, position.z);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const speed = Math.random() * 0.03 + 0.01;

      velocities.push(
        speed * Math.sin(phi) * Math.cos(theta),
        speed * Math.sin(phi) * Math.sin(theta),
        speed * Math.cos(phi)
      );
      sizes.push(Math.random() * 0.15 + 0.05);
    }

    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geo.setAttribute("size", new THREE.Float32BufferAttribute(sizes, 1));

    const points = new THREE.Points(geo, explosionMaterial);
    scene.add(points);
    explosions.push({ mesh: points, velocities: velocities, age: 0 });
  }

  function updateExplosions() {
    for (let i = explosions.length - 1; i >= 0; i--) {
      const ex = explosions[i];
      const positions = ex.mesh.geometry.attributes.position
        .array as Float32Array;
      ex.age += 1;
      for (let j = 0; j < ex.velocities.length / 3; j++) {
        positions[j * 3] += ex.velocities[j * 3];
        positions[j * 3 + 1] += ex.velocities[j * 3 + 1];
        positions[j * 3 + 2] += ex.velocities[j * 3 + 2];
      }
      ex.mesh.geometry.attributes.position.needsUpdate = true;

      const mat = ex.mesh.material as THREE_TYPES.PointsMaterial;
      mat.opacity = 1 - ex.age / 60;
      ex.mesh.scale.setScalar(1 + ex.age * 0.01);

      if (ex.age > 60) {
        scene.remove(ex.mesh);
        ex.mesh.geometry.dispose();
        explosions.splice(i, 1);
      }
    }
  }

  function updateCounter() {
    const counter = document.getElementById("counter");
    if (counter) {
      counter.innerText = `${storedCards.length} / 3`;
    }
    if (storedCards.length === 3) {
      const guide = document.getElementById("guide-text");
      if (guide) {
        guide.innerText = "Định mệnh đã an bài...";
      }
      setTimeout(revealReading, 2000);
    }
  }

  function pickCard(card: THREE_TYPES.Mesh) {
    if (inspectingCard || storedCards.length >= 3 || card.userData.isPicked)
      return;
    card.userData.isPicked = true;
    inspectingCard = card;
    scene.attach(card);

    new TWEEN.Tween(card.position)
      .to(CONFIG.inspectPos, 1200)
      .easing(TWEEN.Easing.Cubic.InOut)
      .start();

    new TWEEN.Tween(card.rotation)
      .to({ x: 0, y: Math.PI, z: 0 }, 1200)
      .easing(TWEEN.Easing.Exponential.InOut)
      .start();

    const targetScale = CONFIG.inspectScale;
    new TWEEN.Tween(card.scale)
      .to({ x: targetScale, y: targetScale, z: targetScale }, 1200)
      .easing(TWEEN.Easing.Back.Out)
      .onComplete(() => {
        setTimeout(() => {
          createExplosion(card.position);
          setTimeout(storeCard, 200);
        }, 1200);
      })
      .start();
  }

  function getSafeVerticalLeftPosition(index: number) {
    const dist = camera.position.z - CONFIG.storageZ;
    const vFOV = (camera.fov * Math.PI) / 180;
    const visibleHeight = 2 * Math.tan(vFOV / 2) * dist;
    const visibleWidth =
      visibleHeight * (container.clientWidth / container.clientHeight);

    const leftEdge = -visibleWidth / 2;
    const topEdge = visibleHeight / 2;

    const x = leftEdge + CONFIG.storeMarginX;
    const y = topEdge - CONFIG.storeMarginTop - index * CONFIG.storeGapY;

    return { x, y, z: CONFIG.storageZ };
  }

  function storeCard() {
    if (!inspectingCard) return;
    const card = inspectingCard;
    storedCards.push(card);
    inspectingCard = null;
    const index = storedCards.length - 1;

    const pos = getSafeVerticalLeftPosition(index);
    const scale = CONFIG.storageScale;

    new TWEEN.Tween(card.position)
      .to({ x: pos.x, y: pos.y, z: pos.z }, 800)
      .easing(TWEEN.Easing.Exponential.Out)
      .start();
    new TWEEN.Tween(card.scale)
      .to({ x: scale, y: scale, z: scale }, 800)
      .start();

    updateCounter();
    repositionStoredCards();
  }

  function repositionStoredCards() {
    const scale = CONFIG.storageScale;
    storedCards.forEach((c, i) => {
      const pos = getSafeVerticalLeftPosition(i);
      new TWEEN.Tween(c.position)
        .to({ x: pos.x, y: pos.y, z: pos.z }, 500)
        .start();
      new TWEEN.Tween(c.scale)
        .to({ x: scale, y: scale, z: scale }, 500)
        .start();
    });
  }

  function revealReading() {
    isGameActive = false;
    const uiLayer = document.getElementById("ui-layer");
    if (uiLayer) {
      uiLayer.style.pointerEvents = "auto";
    }
    const guideText = document.getElementById("guide-text");
    if (guideText) {
      guideText.style.opacity = "0";
    }

    const content = document.getElementById("final-reading");
    if (content) {
      let html = "";
      storedCards.forEach((c, i) => {
        const data = c.userData.data;
        html += `
                <div class="reading-section">
                    <span class="reading-label">✦ ${READING_CONTEXTS[i]}</span>
                    <div class="reading-body">
                        <img src="${data.url}" class="reading-img">
                        <div class="reading-content">
                            <h3>${data.name}</h3>
                            <div class="reading-desc">${data.meaning}</div>
                        </div>
                    </div>
                </div>`;
      });
      content.innerHTML = html;
    }

    const resultModal = document.getElementById("result-modal");
    if (resultModal) {
      resultModal.style.display = "block";
    }
  }

  function onMouseDown(event: MouseEvent) {
    if (!isGameActive || storedCards.length >= 3) return;
    const rect = container.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(cardGroup.children);
    if (intersects.length > 0) {
      const object = intersects[0].object as THREE_TYPES.Mesh;
      pickCard(object);
    }
  }

  function onMouseMove(event: MouseEvent) {
    if (!isGameActive) return;
    const rect = container.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(cardGroup.children);

    let foundHover: THREE_TYPES.Mesh | null = null;
    if (intersects.length > 0) {
      const obj = intersects[0].object as THREE_TYPES.Mesh;
      if (!obj.userData.isPicked) {
        foundHover = obj;
      }
    }

    if (foundHover !== hoveredCard) {
      if (hoveredCard) {
        // Reset previous card
        new TWEEN.Tween(hoveredCard.position)
          .to({ z: CONFIG.spreadLayout!.startZ }, 300)
          .easing(TWEEN.Easing.Quadratic.Out)
          .start();
        (hoveredCard.material as THREE_TYPES.MeshStandardMaterial[]).forEach(
          (m) => {
            if (m.emissive) m.emissive.setHex(0x000000);
          }
        );
      }
      if (foundHover) {
        // Lift current card
        new TWEEN.Tween(foundHover.position)
          .to({ z: CONFIG.spreadLayout!.startZ + 0.6 }, 300)
          .easing(TWEEN.Easing.Quadratic.Out)
          .start();

        // Nháy chớp tắt 1 lần khi vừa chạm vào
        const matFront = (
          foundHover.material as THREE_TYPES.MeshStandardMaterial[]
        )[5];
        if (matFront && matFront.emissive) {
          new TWEEN.Tween({ brightness: 0 })
            .to({ brightness: 0.5 }, 150)
            .yoyo(true)
            .repeat(1)
            .onUpdate((obj: { brightness: number }) => {
              matFront.emissive.setScalar(obj.brightness);
            })
            .start();
        }
      }
      hoveredCard = foundHover;
    }

    container.style.cursor = hoveredCard ? "pointer" : "default";
  }

  function onResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
    repositionStoredCards();
  }

  function cleanup() {
    isDisposed = true;
    cancelAnimationFrame(animationId);
    window.removeEventListener("resize", onResize);
    document.removeEventListener("mousedown", onMouseDown);
    document.removeEventListener("mousemove", onMouseMove);

    scene.traverse((object: THREE_TYPES.Object3D) => {
      if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
        if (object.geometry) object.geometry.dispose();

        const material = object.material;
        if (material) {
          const materials = Array.isArray(material) ? material : [material];
          materials.forEach((m) => {
            if ("map" in m && m.map && typeof m.map.dispose === "function") {
              m.map.dispose();
            }
            m.dispose();
          });
        }
      }
    });

    if (particleTexture) particleTexture.dispose();
    if (renderer) renderer.dispose();
  }

  function animate(time: number) {
    if (isDisposed) return;
    animationId = requestAnimationFrame(animate);
    TWEEN.update(time);
    updateExplosions();

    if (isGameActive) {
      const isInspecting = !!inspectingCard;
      cardGroup.children.forEach((obj: THREE_TYPES.Object3D, i: number) => {
        const c = obj as THREE_TYPES.Mesh;
        if (!c.userData.isPicked && c !== hoveredCard) {
          const layout = CONFIG.spreadLayout!;
          const totalRows = Math.ceil(TAROT_DATA.length / layout.cardsPerRow);
          const row = Math.floor(i / layout.cardsPerRow);
          const col = i % layout.cardsPerRow;
          const totalHeight = (totalRows - 1) * layout.rowSpacing;

          const baseY = -row * layout.rowSpacing + totalHeight / 2;
          const normalizedCol = col / (layout.cardsPerRow - 1) - 0.5;
          const arcOffset =
            layout.arcHeight * (1 - 4 * normalizedCol * normalizedCol);
          c.position.y =
            baseY + arcOffset + Math.sin(time * 0.001 + i * 0.1) * 0.05;

          // Dim cards when inspecting
          const targetOpacity = isInspecting ? 0.2 : 1.0;
          (c.material as THREE_TYPES.MeshStandardMaterial[]).forEach((m) => {
            if (m.transparent === undefined) m.transparent = true;
            m.opacity += (targetOpacity - m.opacity) * 0.1;
          });
        }
      });
    }

    if (starFieldMesh) {
      starFieldMesh.rotation.y = time * 0.00005;
      starFieldMesh.rotation.x = time * 0.00002;
    }
    renderer.render(scene, camera);
  }

  init();
  animate(0);

  return cleanup;
}

export default TarotAR;
