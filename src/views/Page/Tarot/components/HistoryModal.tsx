import React from "react";
import { Modal, Button, Popconfirm, List, Empty, Typography } from "antd";
import { DeleteOutlined, HistoryOutlined } from "@ant-design/icons";
import { TarotHistoryItem } from "../../../types/tarot";
import { READING_CONTEXTS } from "../constants";

const { Text } = Typography;

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: TarotHistoryItem[];
  onClear: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  history,
  onClear,
}) => {
  return (
    <Modal
      title={
        <span
          style={{
            color: "#d4af37",
            fontFamily: "Playfair Display, serif",
            fontSize: "1.4rem",
          }}
        >
          <HistoryOutlined style={{ marginRight: 8 }} />
          Nhật Ký Tiên Tri
        </span>
      }
      open={isOpen}
      onCancel={onClose}
      footer={
        history.length > 0 ? (
          <Popconfirm
            title="Xác nhận xóa"
            description="Bạn có chắc chắn muốn xóa toàn bộ nhật ký bói bài không?"
            onConfirm={onClear}
            okText="Đồng ý Xóa"
            cancelText="Hủy bỏ"
            okButtonProps={{ danger: true }}
          >
            <Button danger icon={<DeleteOutlined />}>
              Xóa Lịch Sử
            </Button>
          </Popconfirm>
        ) : null
      }
      width={700}
      centered
      className="tarot-history-modal"
      styles={{
        mask: {
          backdropFilter: "blur(5px)",
        },
      }}
    >
      {history.length === 0 ? (
        <Empty
          description={
            <Text style={{ color: "rgba(255,255,255,0.6)" }}>
              Chưa có lần trải bài nào được ghi lại.
            </Text>
          }
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      ) : (
        <List
          dataSource={history}
          renderItem={(item) => (
            <div
              key={item.id}
              className="history-item"
              style={{
                marginBottom: 20,
                padding: 15,
                background: "rgba(255,255,255,0.03)",
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div
                className="history-item-header"
                style={{
                  marginBottom: 12,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span
                  className="history-date"
                  style={{ color: "#888", fontSize: "0.85rem" }}
                >
                  {new Date(item.timestamp).toLocaleString("vi-VN")}
                </span>
                <span
                  className="history-topic"
                  style={{ color: "#d4af37", fontWeight: 600 }}
                >
                  {item.topic.title}
                </span>
              </div>
              <div
                className="history-cards-mini"
                style={{ display: "flex", gap: 10 }}
              >
                {item.cards.map((card, i) => (
                  <div
                    key={i}
                    className="mini-card"
                    style={{ textAlign: "center", flex: 1 }}
                  >
                    <img
                      src={card.url}
                      alt={card.name}
                      style={{
                        width: "100%",
                        borderRadius: 4,
                        marginBottom: 5,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                      }}
                    />
                    <div
                      className="mini-label"
                      style={{ fontSize: "0.7rem", color: "#aaa" }}
                    >
                      {READING_CONTEXTS[i]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        />
      )}
    </Modal>
  );
};
