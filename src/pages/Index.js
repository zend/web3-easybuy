import React from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Divider, InputAdornment, Stack, TextField, Typography } from "@mui/material";

export default function Index() {
  const importantDays = [];
  const today = dayjs();
  const [value, setValue] = React.useState(new Date());
  const [distance, setDistance] = React.useState(0);
  const [nextDate, setNextDate] = React.useState(0);
  const handleChange = v => {
    setValue(v);
    const target = dayjs(v);
    setDistance(today.diff(target, 'day'));
    const nextInThisYear = target.year(today.year());
    if (nextInThisYear.isBefore(today)) {
      // 今天的已经过去就计算到明年纪念日的距离
      setNextDate(target.year(today.add(1, 'year').year()).diff(today, 'day'));
    } else {
      setNextDate(target.year(today.year()).diff(today, 'day'));
    }
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack p={3}>
        <DesktopDatePicker label='选择日期' inputFormat="YYYY/MM/DD"
          value={value} onChange={v => handleChange(v)}
          renderInput={p => <TextField {...p} />}></DesktopDatePicker>
      </Stack>
      <Divider />
      {/* <Typography my={2}>{value.toLocaleDateString()}</Typography> */}
      <Stack p={3} spacing={3}>
        <TextField label={dayjs(value).isAfter(today) ? '倒计时' : '已经过去'} value={Math.abs(distance)} InputProps={{
          endAdornment: <InputAdornment position="end">天</InputAdornment>,
          readOnly: true
        }}></TextField>
        <TextField label='距下一个纪念日' value={Math.abs(nextDate)} InputProps={{
          endAdornment: <InputAdornment position="end">天</InputAdornment>,
          readOnly: true
        }}></TextField>
      </Stack>
    </LocalizationProvider>
  );
}