export type VoidFunc = () => void;

export type ParamVoidFunc<T, R = undefined> = [R] extends [undefined]
    ? (v: T, r?: R) => void
    : (v: T, r: R) => void;

export type SetStateFunc<T> = React.Dispatch<React.SetStateAction<T>>;
