import { useReducer, useEffect, useRef } from "react";

export default function Select({ options }) {
  const reducer = function (state, action) {
    switch (action.type) {
      case "set_select":
        return { ...state, defaultValue: action.payload.defaultValue };
      case "toggle_select_dropdown":
        return {
          ...state,
          selectDropdownVisibility: !state.selectDropdownVisibility,
        };
      default:
        return state;
    }
  };

  const initialState = {
    defaultValue: "",
    selectDropdownVisibility: false,
  };

  const [selectState, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "set_select", payload: { defaultValue: options[0] } });
  }, []);

  const toggleSelectDropdown = () => {
    dispatch({ type: "toggle_select_dropdown" });
    if (!selectState.selectDropdownVisibility) {
      selectRef.current.classList.remove("hidden");
    } else {
      selectRef.current.classList.add("hidden");
    }
  };
  const handleClick = () => {
    toggleSelectDropdown();
  };

  const handleChangeState = (e) => {
    toggleSelectDropdown();
    dispatch({
      type: "set_select",
      payload: { defaultValue: e.target.childNodes[0].innerHTML },
    });
  };

  const selectRef = useRef(null);

  return (
    <>
      <div className="select-value">
        <span>{selectState.defaultValue}</span>
        <span
          className="font-bold text-pink-500  cursor-pointer"
          onClick={handleClick}
        >
          +
        </span>
      </div>
      <span className="select-dropdown hidden" ref={selectRef}>
        <span className="flex flex-col ">
          {options.map((option) => (
            <span
              className="select-option-container"
              key={crypto.randomUUID()}
              onClick={handleChangeState}
            >
              <span className="select-option">{option}</span>
            </span>
          ))}
        </span>
      </span>
    </>
  );
}
