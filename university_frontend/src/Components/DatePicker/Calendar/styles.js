import styled from "styled-components";

export const Arrow = styled.button`
  appearance: none;
  user-select: none;
  outline: none !important;
  display: inline-block;
  position: relative;
  cursor: pointer;
  padding: 0;
  border: none;
  border-top: 1.6em solid transparent;
  border-bottom: 1.6em solid transparent;
  transition: all 0.25s ease-out;
`;

export const ArrowLeft = styled(Arrow)`
  border-right: 2.4em solid #ccc;
  left: 1.5rem;
  :hover {
    border-right-color: #b03931;
  }
`;

export const ArrowRight = styled(Arrow)`
  border-left: 2.4em solid #ccc;
  right: 1.5rem;
  :hover {
    border-left-color: #b03931;
  }
`;

export const CalendarContainer = styled.div`
  font-size: 5px;
  border: 2px solid #b03931;
  border-radius: 5px;
  overflow: hidden;
`;

export const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CalendarGrid = styled.div`
  display: grid;
  grid-template: repeat(7, auto) / repeat(7, auto);
`;

export const CalendarMonth = styled.div`
  font-weight: 500;
  font-size: 5em;
  color: #b03931;
  text-align: center;
  padding: 0.5em 0.25em;
  word-spacing: 5px;
  user-select: none;
`;

export const CalendarCell = styled.div`
  text-align: center;
  align-self: center;
  letter-spacing: 0.1rem;
  padding: 0.6em 0.25em;
  position: relative;
  user-select: none;
  grid-column: ${(props) => (props.index % 7) + 1} / span 1;
`;

export const CalendarDay = styled(CalendarCell)`
  font-weight: 600;
  font-size: 2.25em;
  color: #b03931;
  border-top: 2px solid #b03931;
  border-bottom: 2px solid #b03931;
  border-right: ${(props) =>
    (props.index % 7) + 1 === 7 ? `none` : `2px solid #b03931`};
`;

export const CalendarDate = styled(CalendarCell)`
  font-weight: ${(props) => (props.inMonth ? 500 : 300)};
  font-size: 4em;
  cursor: ${(props) => (props.inRange ? "pointer" : "default")};
  border-bottom: ${(props) =>
    (props.index + 1) / 7 <= 5 ? `1px solid #ddd` : `none`};
  border-right: ${(props) =>
    (props.index % 7) + 1 === 7 ? `none` : `1px solid #ddd`};
  color: ${(props) =>
    props.inRange ? (props.inMonth ? `#333` : `#ddd`) : `#ddd !important`};
  background: ${(props) =>
    props.inRange ? "transparent" : `rgba(102, 25, 0, 0.04) !important`};
  grid-row: ${(props) => Math.floor(props.index / 7) + 2} / span 1;
  transition: all 0.4s ease-out;
  :hover {
    color: #06c;
    background: rgba(0, 102, 204, 0.075);
  }
`;

export const HighlightedCalendarDate = styled(CalendarDate)`
  ${(props) =>
    props.inRange &&
    `
	  color: #fff !important;
	  background: #b03931 !important;
    ::before {
      content: '';
      position: absolute;
      top: -1px;
      left: -1px;
      width: calc(100% + 2px);
      height: calc(100% + 2px);
      border: 2px solid #b03931;
    }
  `}
`;

export const TodayCalendarDate = styled(HighlightedCalendarDate)`
  ${(props) =>
    props.inRange &&
    `
    color: #b03931 !important;
	  background: transparent !important;
    ::after {
      content: '';
      position: absolute;
      right: 0;
      bottom: 0;
      border-bottom: 0.75em solid #b03931;
      border-left: 0.75em solid transparent;
      border-top: 0.75em solid transparent;
    }
    :hover {
      color: #b03931 !important;
      background: rgba(0, 102, 204, 0.075) !important;
    }
  `}
`;
