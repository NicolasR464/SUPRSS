import { SlDrawer } from 'react-icons/sl'
import { FaPlusCircle } from 'react-icons/fa'

export const Drawer = () => {
    return (
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <label
                    htmlFor="my-drawer"
                    className="btn btn-primary drawer-button p-2  rounded-xs ml-6"
                >
                    <SlDrawer />
                </label>
            </div>
            <div className="drawer-side">
                <label
                    htmlFor="my-drawer"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    <li>
                        <a>
                            <FaPlusCircle /> Add a feed
                        </a>
                    </li>
                    <li>
                        <a>Sidebar Item 2</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}
