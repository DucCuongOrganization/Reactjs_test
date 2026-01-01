import backCardImage from "../../../assets/png/back.png";
import { cloneDeep } from "lodash";
import * as THREE from "three";
import { Tween, Easing, Group as TweenGroup } from "@tweenjs/tween.js";
import { CardData } from "../../types/tarot";
import { TAROT_CONFIG as CONFIG, SCENE_CONFIG, TAROT_DATA } from "./constants";

interface Explosion {
  mesh: THREE.Points;
  velocities: number[];
  age: number;
}

export interface TarotSceneCallbacks {
  onLoadingComplete: () => void;
  onCardPicked: (count: number) => void;
  onSelectionComplete: (cards: CardData[]) => void;
}

export class TarotSceneManager {
  private container: HTMLDivElement;
  private callbacks: TarotSceneCallbacks;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private tweenGroup: TweenGroup = new TweenGroup();
  private animationId!: number;
  private isDisposed = false;

  private cardGroup!: THREE.Group;
  private textureLoader!: THREE.TextureLoader;
  private raycaster!: THREE.Raycaster;
  private mouse!: THREE.Vector2;
  private starFieldMesh!: THREE.InstancedMesh;
  private explosions: Explosion[] = [];
  private storedCards: THREE.Mesh[] = [];
  private inspectingCard: THREE.Mesh | null = null;
  private hoveredCard: THREE.Mesh | null = null;
  private isGameActive = false;

  private particleTexture!: THREE.Texture;
  private explosionMaterial!: THREE.PointsMaterial;

  // Bound event handlers for proper cleanup
  private onMouseDownBound: (event: MouseEvent) => void;
  private onMouseMoveBound: (event: MouseEvent) => void;
  private onResizeBound: () => void;
  private animateBound: (time: number) => void;

  constructor(container: HTMLDivElement, callbacks: TarotSceneCallbacks) {
    this.container = container;
    this.callbacks = callbacks;

    // Bind event handlers once
    this.onMouseDownBound = this.onMouseDown.bind(this);
    this.onMouseMoveBound = this.onMouseMove.bind(this);
    this.onResizeBound = this.onResize.bind(this);
    this.animateBound = this.animate.bind(this);

    this.init();
    this.animateBound(0);
  }

  private init() {
    this.scene = new THREE.Scene();
    if (SCENE_CONFIG.fog) {
      this.scene.fog = new THREE.FogExp2(
        SCENE_CONFIG.fog.color,
        SCENE_CONFIG.fog.density
      );
    }

    this.camera = new THREE.PerspectiveCamera(
      SCENE_CONFIG.camera.fov,
      this.container.clientWidth / this.container.clientHeight,
      SCENE_CONFIG.camera.near,
      SCENE_CONFIG.camera.far
    );
    this.camera.position.set(0, 0, SCENE_CONFIG.camera.position.z);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    this.renderer.setSize(
      this.container.clientWidth,
      this.container.clientHeight
    );
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.NoToneMapping;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.domElement.style.touchAction = "none";
    this.container.appendChild(this.renderer.domElement);

    const ambient = new THREE.AmbientLight(
      SCENE_CONFIG.lighting.ambient.color,
      SCENE_CONFIG.lighting.ambient.intensity * 6.0
    );
    this.scene.add(ambient);

    const spotLight = new THREE.SpotLight(
      SCENE_CONFIG.lighting.spot.color,
      SCENE_CONFIG.lighting.spot.intensity * 5.0
    );
    spotLight.position.set(
      SCENE_CONFIG.lighting.spot.position.x,
      SCENE_CONFIG.lighting.spot.position.y,
      SCENE_CONFIG.lighting.spot.position.z
    );
    this.scene.add(spotLight);

    this.textureLoader = new THREE.TextureLoader();
    this.textureLoader.setCrossOrigin("anonymous");
    this.particleTexture = this.generateParticleTexture();

    const shuffledCards = cloneDeep(TAROT_DATA);
    this.shuffleArray(shuffledCards);
    this.createCards(shuffledCards);
    this.createBackgroundStars();

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    // Attach to container for better click reliability
    this.container.addEventListener("pointerdown", this.onMouseDownBound);
    this.container.addEventListener("pointermove", this.onMouseMoveBound);
    window.addEventListener("resize", this.onResizeBound);

    setTimeout(() => this.callbacks.onLoadingComplete(), 2500);
  }

  private shuffleArray<T>(array: T[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  private generateParticleTexture(): THREE.Texture {
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

  private createBackgroundStars() {
    const count = SCENE_CONFIG.stars.count;
    const geo = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const mat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    this.starFieldMesh = new THREE.InstancedMesh(geo, mat, count);
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
      dummy.updateMatrix();
      this.starFieldMesh.setMatrixAt(i, dummy.matrix);
    }
    this.scene.add(this.starFieldMesh);
  }

  private createCards(cardData: CardData[]) {
    this.cardGroup = new THREE.Group();
    this.cardGroup.position.y = -1.5; // Move deck down to avoid UI overlap
    this.scene.add(this.cardGroup);
    const geo = new THREE.BoxGeometry(
      CONFIG.cardWidth,
      CONFIG.cardHeight,
      0.02
    );

    // Load card back texture with error handling
    const backTex = this.textureLoader.load(
      backCardImage,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
      },
      undefined, // onProgress
      (error) => {
        console.error("Failed to load card back texture:", error);
        // Fallback: Use a basic color or placeholder if texture fails
        matBack.color.setHex(0x333333);
        matBack.needsUpdate = true;
      }
    );
    const matEdge = new THREE.MeshStandardMaterial({
      color: 0xf5f5f0,
      metalness: 0.1,
      roughness: 0.5,
    });
    const matBack = new THREE.MeshStandardMaterial({
      map: backTex,
      color: 0xffffff,
      roughness: 0.7,
      metalness: 0.0,
    });

    cardData.forEach((data: CardData, i: number) => {
      const matFront = new THREE.MeshStandardMaterial({
        map: null,
        transparent: true,
        color: 0xffffff,
      });

      this.textureLoader.load(
        data.url,
        (texture) => {
          texture.colorSpace = THREE.SRGBColorSpace;
          matFront.map = texture;
          matFront.needsUpdate = true;
        },
        undefined, // onProgress
        (error) => {
          console.error(
            `Failed to load texture for card "${data.name}" (${data.url}):`,
            error
          );
          // Apply red tint on error asynchronously
          matFront.color.setHex(0xff0000);
          matFront.needsUpdate = true;
        }
      );
      const matBackUnique = matBack.clone() as THREE.MeshStandardMaterial;
      matBackUnique.transparent = true;
      const matEdgeUnique = matEdge.clone() as THREE.MeshStandardMaterial;
      matEdgeUnique.transparent = true;

      const materials = [
        matEdgeUnique,
        matEdgeUnique,
        matEdgeUnique,
        matEdgeUnique,
        matBackUnique,
        matFront,
      ];
      const card = new THREE.Mesh(geo, materials);
      card.renderOrder = 0; // Deck level

      const layout = CONFIG.spreadLayout!;
      const totalRows = Math.ceil(cardData.length / layout.cardsPerRow);
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
      card.userData = { id: i, data: data, isPicked: false };
      this.cardGroup.add(card);
    });
  }

  private createExplosion(position: THREE.Vector3) {
    if (!this.explosionMaterial) {
      this.explosionMaterial = new THREE.PointsMaterial({
        size: 0.2,
        map: this.particleTexture,
        transparent: true,
        opacity: 0.9,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        color: 0xffffff,
      });
    }

    const particleCount = 1500;
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

    const points = new THREE.Points(geo, this.explosionMaterial);
    this.scene.add(points);
    this.explosions.push({ mesh: points, velocities: velocities, age: 0 });
  }

  private updateExplosions() {
    for (let i = this.explosions.length - 1; i >= 0; i--) {
      const ex = this.explosions[i];
      const positions = ex.mesh.geometry.attributes.position
        .array as Float32Array;
      ex.age += 1;
      for (let j = 0; j < ex.velocities.length / 3; j++) {
        positions[j * 3] += ex.velocities[j * 3];
        positions[j * 3 + 1] += ex.velocities[j * 3 + 1];
        positions[j * 3 + 2] += ex.velocities[j * 3 + 2];
      }
      ex.mesh.geometry.attributes.position.needsUpdate = true;
      const mat = ex.mesh.material as THREE.PointsMaterial;
      mat.opacity = 1 - ex.age / 60;
      ex.mesh.scale.setScalar(1 + ex.age * 0.01);

      if (ex.age > 60) {
        this.scene.remove(ex.mesh);
        ex.mesh.geometry.dispose();
        this.explosions.splice(i, 1);
      }
    }
  }

  private updatePhase() {
    this.callbacks.onCardPicked(this.storedCards.length);
    if (this.storedCards.length === 3) {
      setTimeout(() => {
        this.isGameActive = false;
        const cardsData = this.storedCards.map((c) => c.userData.data);
        this.callbacks.onSelectionComplete(cardsData);
      }, 2500);
    }
  }

  private pickCard(card: THREE.Mesh) {
    if (
      this.inspectingCard ||
      this.storedCards.length >= 3 ||
      card.userData.isPicked
    )
      return;
    card.userData.isPicked = true;
    this.inspectingCard = card;
    this.scene.attach(card);

    // Ensure card is always on top
    card.renderOrder = 999;
    (card.material as THREE.MeshStandardMaterial[]).forEach((m) => {
      m.depthTest = false;
      m.transparent = true;
    });

    new Tween(card.position, this.tweenGroup)
      .to(CONFIG.inspectPos, 1200)
      .easing(Easing.Cubic.InOut)
      .start();

    new Tween(card.rotation, this.tweenGroup)
      .to({ x: 0, y: Math.PI, z: 0 }, 1200)
      .easing(Easing.Exponential.InOut)
      .start();

    const targetScale = CONFIG.inspectScale;
    new Tween(card.scale, this.tweenGroup)
      .to({ x: targetScale, y: targetScale, z: targetScale }, 1200)
      .easing(Easing.Back.Out)
      .onComplete(() => {
        setTimeout(() => {
          this.createExplosion(card.position);
          setTimeout(() => this.storeCard(), 200);
        }, 1200);
      })
      .start();
  }

  private getSafeVerticalLeftPosition(index: number) {
    const dist = this.camera.position.z - CONFIG.storageZ;
    const vFOV = (this.camera.fov * Math.PI) / 180;
    const visibleHeight = 2 * Math.tan(vFOV / 2) * dist;
    const visibleWidth =
      visibleHeight *
      (this.container.clientWidth / this.container.clientHeight);

    const leftEdge = -visibleWidth / 2;
    const topEdge = visibleHeight / 2;
    const x = leftEdge + CONFIG.storeMarginX;
    const y = topEdge - CONFIG.storeMarginTop - index * CONFIG.storeGapY;
    return { x, y, z: CONFIG.storageZ };
  }

  private storeCard() {
    if (!this.inspectingCard) return;
    const card = this.inspectingCard;
    this.storedCards.push(card);
    this.inspectingCard = null;
    card.renderOrder = 100; // Stored cards stay on top of grid but below inspection
    (card.material as THREE.MeshStandardMaterial[]).forEach((m) => {
      m.depthTest = true; // Restore depth test for stored cards
    });

    this.repositionStoredCards();
    this.updatePhase();
  }

  private repositionStoredCards() {
    const scale = CONFIG.storageScale;
    this.storedCards.forEach((c, i) => {
      const pos = this.getSafeVerticalLeftPosition(i);

      new Tween(c.position, this.tweenGroup)
        .to({ x: pos.x, y: pos.y, z: pos.z }, 800)
        .easing(Easing.Exponential.Out)
        .start();
      new Tween(c.scale, this.tweenGroup)
        .to({ x: scale, y: scale, z: scale }, 800)
        .easing(Easing.Exponential.Out)
        .start();
    });
  }

  private onMouseDown(event: MouseEvent) {
    if (!this.isGameActive || this.storedCards.length >= 3) return;
    const rect = this.container.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.cardGroup.children);
    if (intersects.length > 0) {
      const object = intersects[0].object as THREE.Mesh;
      this.pickCard(object);
    }
  }

  private onMouseMove(event: MouseEvent) {
    if (!this.isGameActive) return;
    const rect = this.container.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.cardGroup.children);

    let foundHover: THREE.Mesh | null = null;
    if (intersects.length > 0) {
      const obj = intersects[0].object as THREE.Mesh;
      if (!obj.userData.isPicked) foundHover = obj;
    }

    if (foundHover !== this.hoveredCard) {
      if (this.hoveredCard) {
        new Tween(this.hoveredCard.position, this.tweenGroup)
          .to({ z: CONFIG.spreadLayout!.startZ }, 300)
          .easing(Easing.Quadratic.Out)
          .start();
        (this.hoveredCard.material as THREE.MeshStandardMaterial[]).forEach(
          (m) => {
            if (m.emissive) m.emissive.setHex(0x000000);
          }
        );
      }
      if (foundHover) {
        new Tween(foundHover.position, this.tweenGroup)
          .to({ z: CONFIG.spreadLayout!.startZ + 0.6 }, 300)
          .easing(Easing.Quadratic.Out)
          .start();
        const matFront = (
          foundHover.material as THREE.MeshStandardMaterial[]
        )[5];
        if (matFront && matFront.emissive) {
          new Tween({ brightness: 0 }, this.tweenGroup)
            .to({ brightness: 0.5 }, 150)
            .yoyo(true)
            .repeat(1)
            .onUpdate((obj: { brightness: number }) => {
              matFront.emissive.setScalar(obj.brightness);
            })
            .start();
        }
      }
      this.hoveredCard = foundHover;
    }
    this.container.style.cursor = this.hoveredCard ? "pointer" : "default";
  }

  private onResize() {
    this.camera.aspect =
      this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(
      this.container.clientWidth,
      this.container.clientHeight
    );
    this.repositionStoredCards();
  }

  public startGame() {
    this.isGameActive = true;
  }

  public reset() {
    this.isGameActive = false;

    // Return picked cards (which were attached to scene) back to the group
    if (this.inspectingCard) {
      this.cardGroup.add(this.inspectingCard);
      this.inspectingCard = null;
    }
    this.storedCards.forEach((card) => {
      this.cardGroup.add(card);
    });
    this.storedCards = [];

    this.hoveredCard = null;

    // Clear explosions
    this.explosions.forEach((ex) => {
      this.scene.remove(ex.mesh);
      ex.mesh.geometry.dispose();
    });
    this.explosions = [];

    // Stop all running Tweens to prevent conflicts
    this.tweenGroup.removeAll();

    // Shuffle the card meshes directly to maintain texture usage without reloading
    const cards = [...this.cardGroup.children] as THREE.Mesh[];
    this.shuffleArray(cards);

    // Clear and re-add cards in new order
    this.cardGroup.clear();
    cards.forEach((card) => this.cardGroup.add(card));

    const layout = CONFIG.spreadLayout!;
    const totalRows = Math.ceil(cards.length / layout.cardsPerRow);

    // Animate cards back to starting grid positions
    cards.forEach((card, i) => {
      const row = Math.floor(i / layout.cardsPerRow);
      const col = i % layout.cardsPerRow;
      const totalWidth = (layout.cardsPerRow - 1) * layout.cardSpacing;
      const totalHeight = (totalRows - 1) * layout.rowSpacing;

      const x = col * layout.cardSpacing - totalWidth / 2;
      const y = -row * layout.rowSpacing + totalHeight / 2;
      const normalizedCol = col / (layout.cardsPerRow - 1) - 0.5;
      const arcOffset =
        layout.arcHeight * (1 - 4 * normalizedCol * normalizedCol);

      // Reset State
      card.userData.isPicked = false;
      card.userData.id = i;

      // Reset Visuals
      new Tween(card.position, this.tweenGroup)
        .to({ x, y: y + arcOffset, z: layout.startZ }, 500)
        .easing(Easing.Back.Out)
        .start();

      new Tween(card.rotation, this.tweenGroup)
        .to({ x: 0, y: 0, z: 0 }, 500)
        .easing(Easing.Quadratic.Out)
        .start();

      new Tween(card.scale, this.tweenGroup)
        .to({ x: 1, y: 1, z: 1 }, 500)
        .start();

      const materials = card.material as THREE.MeshStandardMaterial[];
      materials.forEach((m) => {
        if (m.transparent) m.opacity = 1;
        if (m.emissive) m.emissive.setHex(0x000000);
      });
      card.visible = true; // Ensure hidden cards are shown again
    });
  }

  public cleanup() {
    this.isDisposed = true;
    cancelAnimationFrame(this.animationId);
    window.removeEventListener("resize", this.onResizeBound);
    this.container.removeEventListener("pointerdown", this.onMouseDownBound);
    this.container.removeEventListener("pointermove", this.onMouseMoveBound);
    this.scene.traverse((object: any) => {
      if (object.isMesh || object.isPoints) {
        if (object.geometry) object.geometry.dispose();
        const material = object.material;
        if (material) {
          const materials = Array.isArray(material) ? material : [material];
          materials.forEach((m: any) => {
            if (m.map && typeof m.map.dispose === "function") m.map.dispose();
            if (typeof m.dispose === "function") m.dispose();
          });
        }
      }
    });
    if (this.particleTexture) this.particleTexture.dispose();
    if (this.renderer) {
      this.renderer.forceContextLoss(); // Force WebGL context release
      this.renderer.dispose();
      this.renderer.domElement.remove(); // Ensure canvas is removed from DOM
    }
  }

  private animate(time: number) {
    if (this.isDisposed) return;
    this.animationId = requestAnimationFrame(this.animateBound);
    // Update our managed tween group
    this.tweenGroup.update(time);

    this.updateExplosions();

    if (this.isGameActive) {
      const isInspecting = !!this.inspectingCard;
      this.cardGroup.children.forEach((obj: THREE.Object3D) => {
        const c = obj as THREE.Mesh;
        // Use the stable ID stored in userData, not the loop index which changes when cards are picked/removed
        const id = c.userData.id;

        if (!c.userData.isPicked && c !== this.hoveredCard) {
          const layout = CONFIG.spreadLayout!;
          const totalRows = Math.ceil(TAROT_DATA.length / layout.cardsPerRow);
          const row = Math.floor(id / layout.cardsPerRow);
          const col = id % layout.cardsPerRow;
          const totalHeight = (totalRows - 1) * layout.rowSpacing;
          const baseY = -row * layout.rowSpacing + totalHeight / 2;
          const normalizedCol = col / (layout.cardsPerRow - 1) - 0.5;
          const arcOffset =
            layout.arcHeight * (1 - 4 * normalizedCol * normalizedCol);
          c.position.y =
            baseY + arcOffset + Math.sin(time * 0.001 + id * 0.1) * 0.05;

          const targetOpacity = isInspecting ? 0.2 : 1.0;
          (c.material as THREE.MeshStandardMaterial[]).forEach((m) => {
            if (m.transparent === undefined) m.transparent = true;
            // Smoothly transition opacity
            m.opacity += (targetOpacity - m.opacity) * 0.1;
          });
          c.visible = true; // Ensure they stay visible during gameplay
        }
      });
    }
    if (this.starFieldMesh) {
      this.starFieldMesh.rotation.y = time * 0.00005;
      this.starFieldMesh.rotation.x = time * 0.00002;
    }
    this.renderer.render(this.scene, this.camera);
  }
}
