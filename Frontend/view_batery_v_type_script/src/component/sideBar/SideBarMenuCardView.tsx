import type { SideBarMenuCard } from "@/types/types";
import { classNames } from "@/util/classes";
import "./SideBarMenuCard.scss"
interface SideBarMenuCardViewProps {
  card: SideBarMenuCard;
  isOpen: boolean;
}
export function SideBarMenuCardView({
  card,
  isOpen,
}: SideBarMenuCardViewProps) {
  return (
    <div className="SideBarMenuCarView">
      <img className={classNames("profile", isOpen ? "" : "collapsed")}
      alt={card.displayName} src={card.photoUrl} width="15%" />
      <div className={classNames("profileInfo", isOpen ? "" : "collapse")}>
        <div className="name">{card.displayName}</div>
        <div className="title">{card.title}</div>
        <div className="url">
          <a href={card.url}>Ir al perfil</a>{" "}
        </div>
      </div>
    </div>
  );
}
