import React, { forwardRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useField } from "@strapi/design-system/Field";

const inputFocusStyle =
  (rootElement = "&") =>
  ({ theme, hasError }) =>
    `
      outline: none;
      box-shadow: 0;
      transition-property: border-color, box-shadow, fill;
      transition-duration: 0.2s;

      ${rootElement}:focus-within {
        border: 1px solid ${
          hasError ? theme.colors.danger600 : theme.colors.primary600
        };
        box-shadow: ${
          hasError ? theme.colors.danger600 : theme.colors.primary600
        } 0px 0px 0px 2px;
      }
    `;

const TextareaWrapper = styled.div`
  border: 1px solid
    ${({ theme, hasError }) =>
      hasError ? theme.colors.danger600 : theme.colors.neutral200};
  border-radius: ${({ theme }) => theme.borderRadius};

  padding-left: ${({ theme, hasLeftAction }) =>
    hasLeftAction ? 0 : theme.spaces[4]};
  padding-right: ${({ theme, hasRightAction }) =>
    hasRightAction ? 0 : theme.spaces[4]};
  padding-top: ${({ theme }) => `${theme.spaces[3]}`};
  padding-bottom: ${({ theme }) => `${theme.spaces[3]}`};

  background: ${({ theme, disabled }) =>
    disabled ? theme.colors.neutral150 : theme.colors.neutral0};
  ${inputFocusStyle()}
`;

const Textarea = styled.textarea`
  display: block;
  width: 100%;
  font-weight: 400;
  font-size: ${14 / 16}rem;
  border: none;
  color: ${({ theme, disabled }) =>
    disabled ? theme.colors.neutral600 : theme.colors.neutral800};
  resize: none;
  background: inherit;

  ::placeholder {
    color: ${({ theme }) => theme.colors.neutral500};
    opacity: 1;
  }

  &:focus-within {
    outline: none;
  }
`;

export const TextareaInput = forwardRef(
  ({ disabled, maxlength, ...props }, ref) => {
    const { id, error, hint, name } = useField();

    let ariaDescription;

    if (error) {
      ariaDescription = `${id}-error`;
    } else if (hint) {
      ariaDescription = `${id}-hint`;
    }

    const hasError = Boolean(error);

    return (
      <TextareaWrapper hasError={hasError} disabled={disabled}>
        <Textarea
          id={id}
          name={name}
          ref={ref}
          aria-describedby={ariaDescription}
          aria-invalid={hasError}
          disabled={disabled}
          hasError={hasError}
          maxlength={maxlength}
          {...props}
        />
      </TextareaWrapper>
    );
  }
);

TextareaInput.displayName = "TextareaInput";

TextareaInput.defaultProps = {
  disabled: false,
};

TextareaInput.propTypes = {
  disabled: PropTypes.bool,
};
