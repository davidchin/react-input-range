import * as React from 'react';

type ComponentType<T> = React.SFC<T> | React.ComponentClass<T>;
type LabelType = "min" | "max" | "value";

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

type FormatLabel = (value: number, type: LabelType) => string;

export interface InputRangeProps {
  allowSameValues?: boolean;
  ariaControls?: string;
  ariaLabelledby?: string;
  classNames?: InputRangeClassNames;
  disabled?: boolean;
  draggableTrack?: boolean;
  formatLabel?: FormatLabel;
  Label?: ComponentType<LabelProps>;
  maxValue?: number;
  minValue?: number;
  name?: string;
  onChange: (value: Range | number) => void;
  onChangeComplete?: (value: Range | number) => void;
  onChangeStart?: (value: Range | number) => void;
  Slider?: ComponentType<SliderProps>;
  step?: number;
  Track?: ComponentType<TrackProps>;
  value: Range | number;
}

export default class InputRange extends React.Component<InputRangeProps, {}> {
}

export interface LabelProps {
  children: React.ReactNode;
  classNames: InputRangeClassNames;
  formatLabel: FormatLabel;
  type: LabelType;
}

export class Label extends React.Component<LabelProps, {}> {
}

export interface SliderProps {
  ariaControls?: string;
  ariaLabelledby?: string;
  classNames?: InputRangeClassNames;
  formatLabel?: FormatLabel;
  Label: ComponentType<LabelProps>
  maxValue?: number;
  minValue?: number;
  value: number;
}

export class Slider extends React.Component<SliderProps, {}> {
}

export interface TrackProps {
  children: React.ReactNode;
  classNames: InputRangeClassNames;
  draggableTrack?: boolean;
  onTrackDrag?: Function;
  onTrackMouseDown: Function;
  percentages: Range;
}

export class Track extends React.Component<TrackProps, {}> {
}
