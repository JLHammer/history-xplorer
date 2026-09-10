import { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useInView } from "../../hooks/useInView";
import { BookIcon } from "../icons/BookIcon";
import { DownArrowIcon } from "../icons/DownArrowIcon";
import type { ReactNode } from "react";

type TimelineProps = {
  children: ReactNode;
  hasMore?: boolean;
  onMore?: () => void;
};

type TimelineItemProps = {
  label: string;
  text?: string | null;
  link?: { href: string; title: string };
};

const TimelineStyled = styled.section`
  --head: 2rem;
  --node: 1.125rem;
  --tick: 5rem;
  --edge: 2.5rem;
  --reach: calc(var(--tick) + 2rem);
  --measure: 22rem;
  --shift: 0rem;
  --hint-shift: ${({ theme }) => theme.spacing.xs};
  --hint-overrun: 8rem;
  --line: 2px;
  --columns: 1fr var(--node) var(--edge);
  --axis: calc(100% - var(--edge) - var(--node) / 2);
  --gap: ${({ theme }) => theme.spacing.xl};
  --head-gap: ${({ theme }) => theme.spacing.xl};
  --foot-gap: ${({ theme }) => theme.spacing.m};

  display: grid;
  grid-template-columns: var(--columns);
  padding: ${({ theme }) => `${theme.spacing.s}`};
  color: ${({ theme }) => theme.colors.light.body};

  body.dark-mode & {
    color: ${({ theme }) => theme.colors.dark.body};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    --columns: 1fr var(--node) 1fr;
    --axis: 50%;
    --gap: ${({ theme }) => theme.spacing.m};
  }
`;

const TimelineHead = styled.div`
  grid-column: 2;
  justify-self: center;
  position: relative;
  z-index: 1;
  width: var(--head);
  height: var(--head);
  border-radius: ${({ theme }) => theme.radii.round};
  background-color: ${({ theme }) => theme.colors.light.timeline};

  body.dark-mode & {
    background-color: ${({ theme }) => theme.colors.dark.timeline};
  }
`;

const TimelineList = styled.ol`
  grid-column: 1 / -1;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--gap);
  margin-top: var(--head-gap);

  &::before {
    content: "";
    position: absolute;
    top: calc(-1 * (var(--head-gap) + var(--head) / 2));
    bottom: calc(-1 * var(--foot-gap));
    left: var(--axis);
    transform: translateX(-50%);
    width: var(--line);
    background-color: ${({ theme }) => theme.colors.light.timeline};

    body.dark-mode & {
      background-color: ${({ theme }) => theme.colors.dark.timeline};
    }
  }
`;

const TimelineLabel = styled.h2`
  grid-row: 1;
  grid-column: 1;
  justify-self: end;
  position: relative;
  padding-inline-end: calc(var(--tick) + var(--shift) - 1rem);
  padding-bottom: 0.25rem;
  white-space: nowrap;
  text-align: right;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.xs};

  &::after {
    content: "";
    position: absolute;
    right: 0;
    bottom: calc(-1 * var(--line) / 2);
    width: calc(var(--tick) + var(--shift));
    height: var(--line);
    background-color: ${({ theme }) => theme.colors.light.timeline};

    body.dark-mode & {
      background-color: ${({ theme }) => theme.colors.dark.timeline};
    }
  }
`;

const TimelineNode = styled.span`
  grid-row: 1;
  grid-column: 2;
  align-self: end;
  justify-self: center;
  position: relative;
  z-index: 1;
  width: var(--node);
  height: var(--node);
  border: var(--line) solid ${({ theme }) => theme.colors.light.timeline};
  border-radius: ${({ theme }) => theme.radii.round};
  background-color: ${({ theme }) => theme.colors.light.surface};
  transform: translateY(50%);

  body.dark-mode & {
    border-color: ${({ theme }) => theme.colors.dark.timeline};
    background-color: ${({ theme }) => theme.colors.dark.surface};
  }
`;

const TimelineBody = styled.div`
  grid-row: 2;
  grid-column: 1;
  justify-self: end;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
  max-width: calc(var(--measure) + var(--reach) + var(--shift));
  padding-top: 0.75rem;
  padding-inline-end: calc(var(--reach) + var(--shift));
  text-align: right;
`;

const TimelineLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: underline;
  text-underline-offset: 0.15em;

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.colors.light.heading};
  }

  body.dark-mode &:hover,
  body.dark-mode &:focus-visible {
    color: ${({ theme }) => theme.colors.dark.heading};
  }

  svg {
    font-size: 1.25rem;
  }
`;

const TimelineItemStyled = styled.li`
  display: grid;
  grid-template-columns: var(--columns);

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    &:nth-child(even) {
      --shift: max(0px, 100% - var(--measure) - var(--reach));

      ${TimelineLabel},
      ${TimelineBody} {
        justify-self: stretch;
      }

      ${TimelineBody} {
        max-width: none;
      }
    }
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    &:nth-child(even) {
      --shift: 0rem;

      ${TimelineLabel},
      ${TimelineBody} {
        justify-self: end;
      }

      ${TimelineBody} {
        max-width: calc(var(--measure) + var(--reach));
      }
    }

    &:nth-child(odd) {
      ${TimelineLabel},
      ${TimelineBody} {
        grid-column: 3;
        justify-self: start;
        text-align: left;
      }

      ${TimelineLabel} {
        padding-inline: calc(var(--tick) - 1rem) 0;
      }

      ${TimelineLabel}::after {
        right: auto;
        left: 0;
      }

      ${TimelineBody} {
        align-items: flex-start;
        padding-inline: var(--reach) 0;
      }

      ${TimelineLink} svg {
        order: 1;
      }
    }
  }
`;

const TimelineEnd = styled.div`
  grid-column: 1 / -1;
  height: 1px;
  margin-bottom: -1px;
`;

const TimelineFoot = styled.div`
  grid-row: 4;
  grid-column: 1 / -1;
  position: sticky;
  bottom: 0;
  z-index: 2;
  display: grid;
  grid-template-columns: var(--columns);
  margin-top: var(--foot-gap);
  pointer-events: none;
`;

const TimelineFootHint = styled.button`
  grid-column: 1 / -1;
  justify-self: end;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
  margin-inline-end: calc(-1 * var(--hint-shift));
  padding-top: ${({ theme }) => theme.spacing.s};
  padding-bottom: ${({ theme }) => theme.spacing.s};
  white-space: nowrap;
  pointer-events: auto;
  cursor: pointer;
  background: linear-gradient(
    to bottom,
    transparent,
    ${({ theme }) => theme.colors.light.surface}
      ${({ theme }) => theme.spacing.s}
  );

  box-shadow: 0 var(--hint-overrun) 0
    ${({ theme }) => theme.colors.light.surface};

  body.dark-mode & {
    background: linear-gradient(
      to bottom,
      transparent,
      ${({ theme }) => theme.colors.dark.surface}
        ${({ theme }) => theme.spacing.s}
    );
    box-shadow: 0 var(--hint-overrun) 0
      ${({ theme }) => theme.colors.dark.surface};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-column: 2;
    justify-self: center;
    align-items: center;
    margin-inline-end: 0;
  }
`;

const TimelineFootText = styled.span`
  padding-inline: 0.5rem;

  ${TimelineFootHint}:hover &,
  ${TimelineFootHint}:focus-visible & {
    color: ${({ theme }) => theme.colors.light.heading};
  }

  body.dark-mode ${TimelineFootHint}:hover &,
  body.dark-mode ${TimelineFootHint}:focus-visible & {
    color: ${({ theme }) => theme.colors.dark.heading};
  }
`;

const bounce = keyframes`
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(0.25rem);
  }
`;

const TimelineFootArrow = styled(DownArrowIcon)`
  font-size: 1.5rem;
  margin-top: calc(-3.5 / 24 * 1.5rem);
  stroke-width: var(--line);
  margin-inline-end: calc(
    var(--edge) + var(--node) / 2 - 0.75rem + var(--hint-shift)
  );
  color: ${({ theme }) => theme.colors.light.timeline};

  ${TimelineFootHint}:hover &,
  ${TimelineFootHint}:focus-visible & {
    animation: ${bounce} 0.8s ease-in-out infinite;
  }

  ${TimelineFootHint}[data-jumping] & {
    animation-play-state: paused;
  }

  body.dark-mode & {
    color: ${({ theme }) => theme.colors.dark.timeline};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    margin-inline-end: 0;
  }
`;

export const Timeline = ({ children, hasMore, onMore }: TimelineProps) => {
  const endRef = useRef<HTMLDivElement>(null);

  const nearEnd = useInView(endRef, "0px 0px 400px 0px");

  useEffect(() => {
    if (nearEnd && hasMore) onMore?.();
  }, [nearEnd, hasMore, onMore]);

  const [jumping, setJumping] = useState(false);

  useEffect(() => {
    if (!jumping) return;

    let timer = 0;
    const settle = () => setJumping(false);
    const restart = () => {
      clearTimeout(timer);
      timer = window.setTimeout(settle, 150);
    };

    restart();
    window.addEventListener("scroll", restart, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", restart);
    };
  }, [jumping]);

  const scrollOn = () => {
    setJumping(true);
    window.scrollBy({ top: window.innerHeight });
  };

  return (
    <TimelineStyled>
      <TimelineHead aria-hidden="true" />
      <TimelineList>{children}</TimelineList>
      <TimelineEnd ref={endRef} aria-hidden="true" />
      <TimelineFoot>
        <TimelineFootHint
          type="button"
          onClick={scrollOn}
          data-jumping={jumping || undefined}
        >
          <TimelineFootText>Scroll down for more</TimelineFootText>
          <TimelineFootArrow />
        </TimelineFootHint>
      </TimelineFoot>
    </TimelineStyled>
  );
};

export const TimelineItem = ({ label, text, link }: TimelineItemProps) => (
  <TimelineItemStyled>
    <TimelineLabel>{label}</TimelineLabel>
    <TimelineNode aria-hidden="true" />
    <TimelineBody>
      {text && <p>{text}</p>}
      {link && (
        <TimelineLink
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Read more about ${link.title}`}
        >
          <BookIcon />
          Read more
        </TimelineLink>
      )}
    </TimelineBody>
  </TimelineItemStyled>
);
