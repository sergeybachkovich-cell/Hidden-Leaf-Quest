"use client";

interface JutsuPanelProps {
  isOpen: boolean;
  unlockedJutsu: string[];
  onCast: (id: string) => void;
}

const JUTSU_DB: Record<string, { name: string; desc: string; icon: string }> = {
  kawarimi: { name: "Каварими но Дзюцу", desc: "Техника Замещения. Мгновенно меняет тело местами с бревном под ударом.", icon: "🪵" },
  bunshin: { name: "Буншин но Дзюцу", desc: "Техника Клонирования. Создает неосязаемую иллюзорную копию для отвлечения.", icon: "👥" }
};

export const JutsuPanel = ({ isOpen, unlockedJutsu, onCast }: JutsuPanelProps) => {
  if (!isOpen) return null;

  return (
    <div style={{ position: "absolute", bottom: "95px", right: "100px", width: "280px", background: "rgba(20,24,28,0.95)", border: "2px solid #ff6b00", borderRadius: "12px", padding: "16px", zIndex: 50, boxShadow: "0 10px 30px rgba(0,0,0,0.7)", color: "#fff", fontFamily: "sans-serif" }}>
      <h4 style={{ margin: "0 0 12px 0", color: "#ff6b00", borderBottom: "1px solid #333", paddingBottom: "6px" }}>⚡ Изученные Ниндзюцу</h4>
      {(unlockedJutsu || []).length === 0 ? (
        <p style={{ color: "#888", fontSize: "14px", margin: 0 }}>Вы еще не обучились ни одному дзюцу в Академии.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {(unlockedJutsu || []).map(id => {
            const data = JUTSU_DB[id];
            if (!data) return null;
            return (
              <div 
                key={id}
                onClick={() => onCast(id)}
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid #444", borderRadius: "6px", padding: "8px", cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = "#ff6b00"}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = "#444"}
              >
                <div style={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: "6px" }}>
                  <span>{data.icon}</span> {data.name}
                </div>
                <div style={{ fontSize: "12px", color: "#aaa", marginTop: "4px" }}>{data.desc}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};