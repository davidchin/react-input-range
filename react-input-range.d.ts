import * as React from 'react';

export interface Range {
  max: number;
  min: number;
}

export interface InputRangeClassNames {
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

export interface InputRangeProps {
  allowSameValues?: boolean;
  ariaLabelledby?: string;
  ariaControls?: string;
  classNames?: InputRangeClassNames;
  disabled?: boolean;
  draggableTrack?: boolean;
  formatLabel?: (value: number, type: string) => string;
  maxValue?: number;
  minValue?: number;
  name?: string;
  onChange: (value: Range | number) => void;
  onChangeStart?: (value: Range | number) => void;
  onChangeComplete?: (value: Range | number) => void;
  step?: number;
  value: Range | number;
}

export default class InputRange extends React.Component<InputRangeProps, any> {
}
