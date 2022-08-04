import { useEffect, useReducer, useCallback } from "react";
import debounce from "lodash/debounce";

const INTERSECTION_THRESHOLD = 5;
const LOAD_DELAY_MS = 500;

const reducer = (state, action) => {
  switch (action.type) {
    case "set": {
      return {
        ...state,
        ...action.payload
      };
    }
    case "onGrabData": {
      if (action.payload.load == 0){
        return {
          ...state,
          loading: false,
          currentPage: state.currentPage + 1
        };
      }
      if (state.loaded>=action.payload.load){
        return {
          ...state,
          loading: false
        };
      }
      // console.log(action.payload.load); // data amount that grabdata has sent
      // console.log(state.data);// amount of data appended to data
      // console.log(action.payload.data);
      // console.log(action.payload.data.length);
      return {
        ...state,
        loading: false,
        loaded: action.payload.load,
        data: [...state.data, ...action.payload.data],
        currentPage: state.currentPage + 1
      };
    }
    default:
      return {
        ...state, loading:false};
  }
};

const useLazyLoad = ({ triggerRef, onGrabData, options }) => {
  console.log(triggerRef)
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    currentPage: 1,
    loaded:0,
    data: []
  });

  const _handleEntry = async (entry) => {
    const boundingRect = entry.boundingClientRect;
    const intersectionRect = entry.intersectionRect;

    if (
      !state.loading &&
      entry.isIntersecting &&
      intersectionRect.bottom - boundingRect.bottom <= INTERSECTION_THRESHOLD
    ) {
      dispatch({ type: "set", payload: { loading: true } });
      const [data, loaded] = await onGrabData(state.currentPage, state.loaded);
      console.log(loaded);
      console.log(data.length);
      dispatch({ type: "onGrabData", payload: { data , load: loaded}});
    }
  };
  const handleEntry = debounce(_handleEntry, LOAD_DELAY_MS);

  const onIntersect = useCallback(
    (entries) => {
      handleEntry(entries[0]);
    },
    [handleEntry]
  );

  useEffect(() => {
    if (triggerRef.current != null) {
      const container = triggerRef.current;
      const observer = new IntersectionObserver(onIntersect, options);

      observer.observe(container);

      return () => {
        observer.disconnect();
      };
    }
  }, [triggerRef, onIntersect, options]);

  return state;
};

export default useLazyLoad;