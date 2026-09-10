import styled from "styled-components";
import { BookIcon } from "../icons/BookIcon";
import type { ReactNode } from "react";

type TimelineProps = {
  children: ReactNode;
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

export const Timeline = ({ children }: TimelineProps) => (
  <TimelineStyled>
    <TimelineHead aria-hidden="true" />
    <TimelineList>{children}</TimelineList>
  </TimelineStyled>
);

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
