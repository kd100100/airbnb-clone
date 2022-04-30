import React from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker, createStaticRanges } from "react-date-range";
import {
	addDays,
	endOfDay,
	startOfDay,
	startOfMonth,
	endOfMonth,
	addMonths,
	startOfWeek,
	endOfWeek,
	startOfTomorrow,
	endOfTomorrow,
} from "date-fns";

const defineds = {
	endOfWeek: endOfWeek(new Date()),
	startOfToday: startOfDay(new Date()),
	endOfToday: endOfDay(new Date()),
	endOfMonth: endOfMonth(new Date()),
	startOfTomorrow: startOfTomorrow(),
	endOfTomorrow: endOfTomorrow(),
	startOfNextWeek: startOfWeek(addDays(new Date(), 7)),
	endOfNextWeek: endOfWeek(addDays(new Date(), 7)),
	startOfNextMonth: startOfMonth(addMonths(new Date(), 1)),
	endOfNextMonth: endOfMonth(addMonths(new Date(), 1)),
};

const customStaticRanges = [
	{
		label: "Today",
		range: function range() {
			return {
				startDate: defineds.startOfToday,
				endDate: defineds.endOfToday,
			};
		},
		isSelected: (range) =>
			range.startDate.getTime() === defineds.startOfToday.getTime() &&
			range.endDate.getTime() === defineds.endOfToday.getTime(),
	},
	{
		label: "Tomorrow",
		range: function range() {
			return {
				startDate: defineds.startOfTomorrow,
				endDate: defineds.endOfTomorrow,
			};
		},
		isSelected: (range) =>
			range.startDate.getTime() === defineds.startOfTomorrow.getTime() &&
			range.endDate.getTime() === defineds.endOfTomorrow.getTime(),
	},
	{
		label: "This Week",
		range: function range() {
			return {
				startDate: defineds.startOfToday,
				endDate: defineds.endOfWeek,
			};
		},
		isSelected: (range) =>
			range.startDate.getTime() === defineds.startOfToday.getTime() &&
			range.endDate.getTime() === defineds.endOfWeek.getTime(),
	},
	{
		label: "Next Week",
		range: function range() {
			return {
				startDate: defineds.startOfNextWeek,
				endDate: defineds.endOfNextWeek,
			};
		},
		isSelected: (range) =>
			range.startDate.getTime() === defineds.startOfNextWeek.getTime() &&
			range.endDate.getTime() === defineds.endOfNextWeek.getTime(),
	},
	{
		label: "This Month",
		range: function range() {
			return {
				startDate: defineds.startOfToday,
				endDate: defineds.endOfMonth,
			};
		},
		isSelected: (range) =>
			range.startDate.getTime() === defineds.startOfToday.getTime() &&
			range.endDate.getTime() === defineds.endOfMonth.getTime(),
	},
	{
		label: "Next Month",
		range: function range() {
			return {
				startDate: defineds.startOfNextMonth,
				endDate: defineds.endOfNextMonth,
			};
		},
		isSelected: (range) =>
			range.startDate.getTime() === defineds.startOfNextMonth.getTime() &&
			range.endDate.getTime() === defineds.endOfNextMonth.getTime(),
	},
];

const Calendar = ({ startDate, endDate, setStartDate, setEndDate }) => {
	const selectionRange = {
		startDate: startDate,
		endDate: endDate,
		key: "selection",
	};

	const handleSelect = (ranges) => {
		setStartDate(ranges.selection.startDate);
		setEndDate(ranges.selection.endDate);
	};
	return (
		<DateRangePicker
			ranges={[selectionRange]}
			minDate={new Date()}
			rangeColors={["#FD5B61"]}
			onChange={handleSelect}
			staticRanges={createStaticRanges(customStaticRanges)}
		/>
	);
};

export default Calendar;
