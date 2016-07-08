// usage from react:
//   import InputRange = require('react-input-range');
//   <InputRange value={this.state.sliderValue} onChange={(a, b) => this.setState({sliderValue})} />
// The legacy 'require'-syntax  is preferred, since the module isn't
// ES6-Standard.

declare module 'react-input-range' {
  export = ReactInputRange.InputRange;
}

declare namespace ReactInputRange {
  interface IRange {
    min: number;
    max: number;
  }

  interface IInputRangeProps {
    classNames?: {
      component?: string;
      labelContainer?: string;
      labelMax?: string;
      labelMin?: string;
      labelValue?: string;
      slider?: string;
      sliderContainer?: string;
      trackActive?: string;
      trackContainer?: string;
    };

    ariaLabelledby?: string;
    ariaControls?: string;
    defaultValue?: number;
    disabled?: boolean;
    formatLabel?:
      (labelValue: string, parameters: { labelPrefix: string, labelSuffix: string}) => string;

    labelPrefix?: string;
    labelSuffix?: string;
    maxValue?: number;
    minValue?: number;
    name?: string;
    onChange: (element: this, value: (number | IRange)) => any;
    onChangeComplete?: () => any;
    step?: number;
    value: number | IRange;
  }

  export class InputRange extends __React.Component<IInputRangeProps, any> {}
}
