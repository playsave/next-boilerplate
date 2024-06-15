import { RootStylesType } from '@/utils/models/menu-model'
import styled from '@emotion/styled'

type StyledMenuSuffixProps = RootStylesType & {
  firstLevel?: boolean
  isCollapsed?: boolean
  isHovered?: boolean
}

const StyledMenuSuffix = styled.span<StyledMenuSuffixProps>`
  margin-inline-start: 5px;
  display: ${({ firstLevel, isCollapsed, isHovered }) => (firstLevel && isCollapsed && !isHovered ? 'none' : 'flex')};
  ${({ rootStyles }) => rootStyles};
`

export default StyledMenuSuffix
