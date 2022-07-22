import React from "react";
import PropTypes from "prop-types";
import {
  Field,
  FieldLabel,
  FieldHint,
  FieldError,
} from "@strapi/design-system/Field";
import { TextareaInput } from "./TextareaInput";
import { Stack } from "@strapi/design-system/Stack";
import { Flex } from "@strapi/design-system/Flex";
import styled from "styled-components";
import { useId } from "../helpers/useId";
import { useIntl } from "react-intl";

const TextareaWrapper = styled.div`
  & textarea {
    // TODO: remove when we'll have fonts in the theme
    height: ${80 / 16}rem;
    line-height: ${20 / 16}rem;
  }

  & textarea::placeholder {
    font-weight: 400;
    font-size: ${14 / 16}rem;
    line-height: 1.43;
    color: ${({ theme }) => theme.colors.neutral500};
    opacity: 1;
  }
`;

export const Textarea = React.forwardRef(
  (
    {
      name,
      hint,
      error,
      intlLabel,
      children,
      labelAction,
      id,
      required,
      attribute,
      value,
      ...props
    },
    ref
  ) => {
    const generatedId = useId("textarea", id);
    const { formatMessage } = useIntl();
    const { maxLength } = attribute;

    return (
      <TextareaWrapper>
        <Field
          name={name}
          hint={(value && maxLength && `${value.length}/${maxLength}`) || hint}
          error={
            (value &&
              maxLength &&
              (value.length > maxLength
                ? `${value.length}/${maxLength}`
                : "")) ||
            error
          }
          id={generatedId}
        >
          <Stack spacing={1}>
            {intlLabel && (
              <Flex>
                <FieldLabel required={required} action={labelAction}>
                  {formatMessage(intlLabel)}
                </FieldLabel>
              </Flex>
            )}
            <TextareaInput
              ref={ref}
              as="textarea"
              value={value}
              {...props}
              maxlength={maxLength}
            />
            <FieldHint />
            <FieldError />
          </Stack>
        </Field>
      </TextareaWrapper>
    );
  }
);

Textarea.displayName = "Textarea";

Textarea.defaultProps = {
  "aria-label": undefined,
  label: undefined,
  labelAction: undefined,
  error: undefined,
  hint: undefined,
  id: undefined,
  children: "",
  required: false,
  intlLabel: "",
  attribute: undefined,
  value: undefined,
};

Textarea.propTypes = {
  "aria-label": PropTypes.string,
  children: PropTypes.string,
  error: PropTypes.string,
  hint: PropTypes.string,
  id: PropTypes.string,
  labelAction: PropTypes.element,
  intlLabel: PropTypes.shape({
    id: PropTypes.string,
    defaultMessage: PropTypes.string,
  }),
  attribute: PropTypes.object,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  value: PropTypes.string,
};
