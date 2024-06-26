import styled from '@emotion/styled'
import { SubMenuContentProps } from '../horizontal-menu/sub-menu-content'

const StyledHorizontalSubMenuContent = styled.div<SubMenuContentProps>`
  inline-size: 260px;
  border-radius: 4px;
  box-shadow: 0 9px 28px 8px #00000011;
  outline: none;
  box-sizing: border-box;
  background-color: white;
  overflow: hidden;

  ${({ browserScroll, top }) =>
    browserScroll && `overflow-y: auto; max-block-size: calc((var(--vh, 1vh) * 100) - ${top}px);`}
  ${({ rootStyles }) => rootStyles};
`

export default StyledHorizontalSubMenuContent
