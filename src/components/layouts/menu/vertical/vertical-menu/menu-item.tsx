import StyledMenuLabel from '@/utils/@core/layouts/styles/styled-menu-label'
import StyledMenuPrefix from '@/utils/@core/layouts/styles/styled-menu-prefix'
import StyledMenuSuffix from '@/utils/@core/layouts/styles/styled-menu-suffix'
import { renderMenuIcon } from '@/utils/helpers/menu/menu-utils'
import useVerticalMenu from '@/utils/hooks/use-vertical-menu'
import useVerticalNav from '@/utils/hooks/use-vertical-nav'
import { ChildrenType } from '@/utils/models/core-model'
import { MenuItemElement, RootStylesType } from '@/utils/models/menu-model'
import { CSSObject } from '@emotion/react'
import classnames from 'classnames'
import { usePathname } from 'next/navigation'
import {
  AnchorHTMLAttributes,
  forwardRef,
  ForwardRefRenderFunction,
  ReactElement,
  ReactNode,
  useEffect,
  useState
} from 'react'
import { useUpdateEffect } from 'react-use'
import { menuClasses } from '../classes/nav-classes'
import StyledVerticalMenuItem from '../styles/styled-vertical-menu-item'
import MenuButton from './menu-button'

export type MenuItemProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'prefix'> &
  RootStylesType &
  Partial<ChildrenType> & {
    icon?: ReactElement
    prefix?: ReactNode
    suffix?: ReactNode
    disabled?: boolean
    target?: string
    rel?: string
    component?: string | ReactElement
    onActiveChange?: (active: boolean) => void

    /**
     * @ignore
     */
    level?: number
  }

const MenuItem: ForwardRefRenderFunction<HTMLLIElement, MenuItemProps> = (props, ref) => {
  // Props
  const {
    children,
    icon,
    className,
    prefix,
    suffix,
    level = 0,
    disabled = false,
    component,
    onActiveChange,
    rootStyles,
    ...rest
  } = props

  // States
  const [active, setActive] = useState(false)

  // Hooks
  const pathname = usePathname()
  const { menuItemStyles, renderExpandedMenuItemIcon, textTruncate } = useVerticalMenu()

  const { isCollapsed, isHovered, isPopoutWhenCollapsed, toggleVerticalNav, isToggled, isBreakpointReached } =
    useVerticalNav()

  // Get the styles for the specified element.
  const getMenuItemStyles = (element: MenuItemElement): CSSObject | undefined => {
    // If the menuItemStyles prop is provided, get the styles for the specified element.
    if (menuItemStyles) {
      // Define the parameters that are passed to the style functions.
      const params = { level, disabled, active, isSubmenu: false }

      // Get the style function for the specified element.
      const styleFunction = menuItemStyles[element]

      if (styleFunction) {
        // If the style function is a function, call it and return the result.
        // Otherwise, return the style function itself.
        return typeof styleFunction === 'function' ? styleFunction(params) : styleFunction
      }
    }
  }

  // Handle the click event.
  const handleClick = () => {
    if (isToggled) {
      toggleVerticalNav()
    }
  }

  // Change active state when the url changes
  useEffect(() => {
    const href = rest.href || (component && typeof component !== 'string' && component.props.href)

    if (href) {
      // Check if the current url matches any of the children urls
      if (pathname === href) {
        setActive(true)
      } else {
        setActive(false)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  // Call the onActiveChange callback when the active state changes.
  useUpdateEffect(() => {
    onActiveChange?.(active)
  }, [active])

  return (
    <StyledVerticalMenuItem
      ref={ref}
      className={classnames(
        menuClasses.menuItemRoot,
        { [menuClasses.disabled]: disabled },
        { [menuClasses.active]: active },
        className
      )}
      level={level}
      isCollapsed={isCollapsed}
      isPopoutWhenCollapsed={isPopoutWhenCollapsed}
      disabled={disabled}
      buttonStyles={getMenuItemStyles('button')}
      menuItemStyles={getMenuItemStyles('root')}
      rootStyles={rootStyles}
    >
      <MenuButton
        className={classnames(menuClasses.button, { [menuClasses.active]: active })}
        component={component}
        tabIndex={disabled ? -1 : 0}
        {...rest}
        onClick={e => {
          handleClick()
          rest.onClick && rest.onClick(e)
        }}
      >
        {/* Menu Item Icon */}
        {renderMenuIcon({
          icon,
          level,
          active,
          disabled,
          renderExpandedMenuItemIcon,
          styles: getMenuItemStyles('icon'),
          isBreakpointReached
        })}

        {/* Menu Item Prefix */}
        {prefix && (
          <StyledMenuPrefix
            isHovered={isHovered}
            isCollapsed={isCollapsed}
            firstLevel={level === 0}
            className={menuClasses.prefix}
            rootStyles={getMenuItemStyles('prefix')}
          >
            {prefix}
          </StyledMenuPrefix>
        )}

        {/* Menu Item Label */}
        <StyledMenuLabel
          className={menuClasses.label}
          rootStyles={getMenuItemStyles('label')}
          textTruncate={textTruncate}
        >
          {children}
        </StyledMenuLabel>

        {/* Menu Item Suffix */}
        {suffix && (
          <StyledMenuSuffix
            isHovered={isHovered}
            isCollapsed={isCollapsed}
            firstLevel={level === 0}
            className={menuClasses.suffix}
            rootStyles={getMenuItemStyles('suffix')}
          >
            {suffix}
          </StyledMenuSuffix>
        )}
      </MenuButton>
    </StyledVerticalMenuItem>
  )
}

export default forwardRef(MenuItem)
