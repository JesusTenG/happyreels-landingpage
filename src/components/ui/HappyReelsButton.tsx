import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

import { StarBorderButton } from "@/components/ui/StarBorderButton";

import styles from "./HappyReelsButton.module.css";

type CommonProps = {
  label?: string;
  children?: ReactNode;
  ariaLabel?: string;
  className?: string;
  variant?: "primary" | "secondary" | "accent" | "on-yellow" | "on-brown" | "on-light" | "on-rose";
  showIcon?: boolean;
  enableMovingBorder?: boolean;
};

type LinkProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children" | "aria-label"> & {
    href: string;
  };

type NativeButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children" | "aria-label"> & {
    href?: undefined;
  };

type Props = LinkProps | NativeButtonProps;

function isLinkProps(props: Props): props is LinkProps {
  return typeof (props as LinkProps).href === "string";
}

export default function HappyReelsButton(props: Props) {
  const {
    label,
    children,
    ariaLabel,
    className,
    variant = "primary",
    showIcon = true,
    enableMovingBorder = false,
    ...domProps
  } = props;

  const content = children ?? label ?? "";
  const variantClass = styles[variant];
  const starVariant = variant === "secondary" || variant === "on-light" ? "secondary" : "primary";
  const borderClass = enableMovingBorder ? styles.withMovingBorder : "";
  const buttonClass = [styles.button, variantClass, borderClass, className]
    .filter(Boolean)
    .join(" ");
  const computedAriaLabel =
    ariaLabel ?? (typeof content === "string" ? content : undefined);

  const innerContent = (
    <>
      <span className={styles.label}>{content}</span>
      {showIcon ? (
        <span className={styles.icon} aria-hidden="true">
          <span />
        </span>
      ) : null}
    </>
  );

  if (enableMovingBorder) {
    if (isLinkProps(props)) {
      const { href, ...anchorProps } = domProps as Omit<LinkProps, keyof CommonProps>;
      return (
        <StarBorderButton
          href={href}
          data-hr-button
          variant={starVariant}
          color="var(--color-happy-gold)"
          speed="5.5s"
          thickness={2}
          innerClassName={buttonClass}
          ariaLabel={computedAriaLabel}
          {...anchorProps}
        >
          {innerContent}
        </StarBorderButton>
      );
    }

    const { href: _href, ...buttonProps } = domProps as Omit<NativeButtonProps, keyof CommonProps>;
    void _href;
    return (
      <StarBorderButton
        data-hr-button
        variant={starVariant}
        color="var(--color-happy-gold)"
        speed="5.5s"
        thickness={2}
        innerClassName={buttonClass}
        ariaLabel={computedAriaLabel}
        {...buttonProps}
      >
        {innerContent}
      </StarBorderButton>
    );
  }

  if (isLinkProps(props)) {
    const { href, ...anchorProps } = domProps as Omit<LinkProps, keyof CommonProps>;
    return (
      <a
        href={href}
        {...anchorProps}
        className={buttonClass}
        aria-label={computedAriaLabel}
        data-hr-button
      >
        {innerContent}
      </a>
    );
  }

  const { href: _href, ...buttonProps } = domProps as Omit<NativeButtonProps, keyof CommonProps>;
  void _href;
  return (
    <button
      {...buttonProps}
      className={buttonClass}
      aria-label={computedAriaLabel}
      data-hr-button
      type={buttonProps.type ?? "button"}
    >
      {innerContent}
    </button>
  );
}
