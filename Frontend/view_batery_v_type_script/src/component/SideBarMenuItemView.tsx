import type { SideBarMenuItem } from "@/types/types";
import { classNames } from "@/util/classes";
import "./SideBarMenuItemView.scss"
interface SideBarMenuItemViewProps {
    item:SideBarMenuItem;
    isOpen:boolean
}
export function SideBarMenuItemView({item,isOpen}:SideBarMenuItemViewProps){
    return (
        <div className="SideBarMenuItemView">
            <a href={item.url}>
                <div className={classNames('ItemContent',isOpen? '':'collapsed')}>
                    <div className="icon">
                        <item.icon size="32"/>
                    </div>
                    <span className={classNames('label',isOpen? '':'collapsed')}>{item.label}</span>
                </div>
            </a>
            {!isOpen? <div className="tooltip">
                {item.label}
            </div>:"" }
        </div>
    )
}