import type { DeepReadonly } from "../../utils/helpers/typescript";
import "./input.scss";

export interface InputProps {
  id?: string;
  label?: string;
  name?: string;
  value?: string;
  inputmode?: string;
  pattern?: string;
  minlength?: string;
  maxlength?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const Input = (props: DeepReadonly<InputProps>) => {
  return (
    <div className="input">
      {props.label && <label>{props.label}</label>}
      <input
        {...props}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
          props.onKeyDown && props.onKeyDown(e)
        }
        onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) =>
          props.onKeyUp && props.onKeyUp(e)
        }
      />
    </div>
  );
};
