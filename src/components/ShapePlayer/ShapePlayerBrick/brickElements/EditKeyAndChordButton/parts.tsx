import { font } from "@/components/ui";
import styled, { css } from "styled-components";
import { Button as _Button } from "@/components/ui";

export const Button = styled(_Button)`
  align-items: baseline;
`;

export const KeyName = styled.span<{ $isDuplicateKey: boolean }>`
  width: 50px;
  text-align: center;
  display: inline-block;
  ${({ $isDuplicateKey }) =>
    $isDuplicateKey &&
    css`
      opacity: 0;
    `}
`;

export const KeyNamePart = styled.span<{ $bold?: boolean }>`
  ${({ $bold }) =>
    $bold &&
    css`
      font-weight: bold;
    `}
`;

export const RoleNumName = styled.span`
  display: inline-block;
  width: 50px;
  text-align: center;
  font-size: ${font.xl};
`;

export const BaseChordName = styled.span`
  display: inline-block;
  text-align: center;
  width: 50px;
`;
