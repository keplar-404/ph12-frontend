import { NavLink } from "react-router-dom";

export default function LinkComponent({ name, navigate }) {
  // console.log(name)
  return (
    <>
      <NavLink
        to={navigate}
        className={({ isActive }) =>
          isActive
            ? " text-[#FF552A] text-[1.125rem] font-semibold tracking-[-0.01875rem]"
            : "text-black text-[1.125rem] font-semibold tracking-[-0.01875rem]"
        }
      >
        {name}
      </NavLink>
    </>
  );
}
