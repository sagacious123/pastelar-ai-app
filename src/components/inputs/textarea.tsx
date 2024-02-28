import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormErrorMessageProps,
  FormHelperText,
  FormLabel,
  FormLabelProps,
  FormHelperTextProps,
  Textarea,
  InputElementProps,
  InputGroup,
  InputLeftElement,
  TextareaProps,
  InputRightElement,
  InputAddonProps,
  InputLeftAddon,
  InputRightAddon,
  Tooltip,
} from "@chakra-ui/react";
import { BsInfoCircle } from "react-icons/bs";
import { useWindowWidth } from "utilities/windowWidth";

export interface PrimaryTextareaProp extends TextareaProps {
  disabled?: boolean;
  inputRef?: React.LegacyRef<HTMLTextAreaElement>;
  label?: string;
  labelProps?: FormLabelProps;
  formControlProps?: FormControlProps;
  value?: string;
  error?: boolean;
  bottomTextOnError?: boolean;
  bottomText?: string | React.ReactElement;
  setValue?: (value: string) => void;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
  leftComponentProps?: InputElementProps;
  rightComponentProps?: InputElementProps;
  leftAddonProps?: InputAddonProps;
  rightAddonProps?: InputAddonProps;
  errorTextProps?: FormErrorMessageProps;
  bottomTextProps?: FormHelperTextProps;
  labelInfo?: string;
}

export const PrimaryTextarea: React.FC<PrimaryTextareaProp> = ({
  disabled,
  inputRef,
  label,
  labelProps,
  setValue,
  error,
  bottomTextOnError = true,
  bottomText,
  leftComponent,
  rightComponent,
  formControlProps,
  leftComponentProps,
  rightComponentProps,
  leftAddon,
  rightAddon,
  leftAddonProps,
  rightAddonProps,
  errorTextProps,
  bottomTextProps,
  labelInfo,
  ...rest
}) => {
  const windowWidth = useWindowWidth();
  return (
    <FormControl
      isInvalid={error}
      isRequired={rest.isRequired}
      isReadOnly={rest.isReadOnly}
      {...formControlProps}
    >
      <FormLabel {...labelProps}>
        {label}
        {Boolean(labelInfo) && (
          <Tooltip
            hasArrow
            label={labelInfo}
            bg='gray.900'
            color='white'
            placement={"top"}
            p='2'
            fontSize='sm'
            rounded='md'
            fontWeight='400'
          >
            <span className='d-inline-block ms-2 cursor-pointer'>
              <BsInfoCircle />
            </span>
          </Tooltip>
        )}
      </FormLabel>
      <InputGroup size={rest.size}>
        {/* left component goes here  */}
        {Boolean(leftComponent) && (
          <InputLeftElement {...leftComponentProps}>{leftComponent}</InputLeftElement>
        )}

        {Boolean(leftAddon) && <InputLeftAddon {...leftAddonProps}>{leftAddon}</InputLeftAddon>}

        <Textarea
          ref={inputRef}
          className='py-3 h-auto primary-input'
          isDisabled={disabled}
          isInvalid={error}
          isRequired={rest.isRequired}
          errorBorderColor='red.300'
          bg={window.location.pathname === "/exporter/campaign/create" && windowWidth <= 768 ? "white" : ""}
          {...rest}
        />

        {Boolean(rightAddon) && <InputRightAddon {...rightAddonProps}>{rightAddon}</InputRightAddon>}

        {/* right component goes here  */}
        {Boolean(rightComponent) && (
          <InputRightElement {...rightComponentProps}>{rightComponent}</InputRightElement>
        )}
      </InputGroup>
      {Boolean(error && bottomText) && <FormErrorMessage {...errorTextProps}>{bottomText}</FormErrorMessage>}
      {Boolean(!bottomTextOnError && !error && bottomText) && (
        <FormHelperText {...bottomTextProps}>{bottomText}</FormHelperText>
      )}
    </FormControl>
  );
};
