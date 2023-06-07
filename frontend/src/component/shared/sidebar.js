import { forwardRef } from "react";
import { Link, useLocation } from "react-router-dom"
import { MdCottage, MdGroup, MdShopTwo, MdCategory } from "react-icons/md"

const SideBar = forwardRef(({ }, ref) => {
    const { pathname } = useLocation()
    const listMenu = [
        { to: '/', path: '/', icon: <MdCottage />, name: 'Home' },
        { to: 'user', path: 'user', icon: <MdGroup />, name: 'User' },
        { to: 'category', path: 'category', icon: <MdCategory />, name: 'Category' },
        { to: 'product', path: 'product', icon: <MdShopTwo />, name: 'Product' }
    ]
    return (
        <div ref={ref} className="fixed w-56 h-full bg-white shadow-sm">
            <div className="flex justify-center mt-6 mb-14">
                <picture>
                    <img
                        className="w-32 h-auto"
                        src="/veritas.webp"
                        alt="company logo"
                    />
                </picture>
            </div>

            <div className="flex flex-col">
                {(listMenu || []).map((item) => (

                    <Link to={`${item.to}`}>
                        <div
                            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${ pathname == item.path
                                    ? "bg-orange-100 text-orange-500"
                                    : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
                                }`}
                        >
                            <div className=" mr-2">{item.icon}
                            </div>
                            <div>
                                <p>{item.name}</p>
                            </div>
                        </div>
                    </Link>
                ))}

            </div>
        </div>
    );
});

SideBar.displayName = "SideBar";

export default SideBar;