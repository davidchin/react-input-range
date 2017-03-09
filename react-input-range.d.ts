import * as React from 'react';

declare interface Range {
  max: number;
  min: number;
}

declare interface InputRangeClassNames {
  activeTrack: string;
  disabledInputRange: string;
  inputRange: string;
  labelContainer: string;
  maxLabel: string;
  minLabel: string;
  slider: string;
  sliderContainer: string;
  track: string;
  valueLabel: string;
}

declare interface InputRangeProps {
  ariaLabelledby?: string;
  ariaControls?: string;
  classNames?: InputRangeClassNames;
  disabled?: boolean;
  formatLabel?: (value: number, type: string) => string;
  maxValue?: number;
  minValue?: number;
  name?: string;
  onChange: (value: Range | number) => void;
  onChangeComplete?: (value: Range | number) => void;
  step?: number;
  value: Range | number;
}

declare class InputRange extends React.Component<InputRangeProps, any> {

}
