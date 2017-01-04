// usage from react:
//   import InputRange = require('react-input-range');
//   <InputRange value={this.state.sliderValue} onChange={(a, b) => this.setState({sliderValue})} />
// The legacy 'require'-syntax  is preferred, since the module isn't
// ES6-Standard.

/// <reference types="react" />

import {ClassicComponentClass} from 'react';

declare let InputRange: ClassicComponentClass<ReactInputRange.IInputRangeProps>;
export = InputRange;

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
    formatLabel?: (labelValue: string, parameters: {labelPrefix: string, labelSuffix: string}) => string;
    labelPrefix?: string;
    labelSuffix?: string;
    maxValue?: number;
    minValue?: number;
    name?: string;
    onChange: (element: this, value: (number | IRange)) => void;
    onChangeComplete?: () => void;
    step?: number;
    value: number | IRange;
  }
}
