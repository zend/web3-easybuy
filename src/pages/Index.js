import React from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Divider, InputAdornment, Stack, TableContainer, TextField, Paper, TableBody, TableRow, TableCell, Table } from "@mui/material";
import { Solar, LunarYear } from "lunar-javascript";

export default function Index() {
  const today = dayjs();
  const [value, setValue] = React.useState(new Date());
  const [distance, setDistance] = React.useState(0);
  const [nextDate, setNextDate] = React.useState(0);
  const [huangLi, setHuangLi] = React.useState([]);

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

    // 计算老黄历
    
    const s = Solar.fromDate(target.toDate());
    const d = s.getLunar();
    const foto = d.getFoto();
    const tao = d.getTao();
    const lunarYear = LunarYear.fromYear(d.getYear());
    const res = [];
    res.push(['公历', s.getYear()+'年 '+s.getMonth()+'月 '+s.getDay()+'日 星期'+s.getWeekInChinese()+' '+s.getXingZuo()+'座 (阳历)']);
    res.push(['阴历', d.getYearInChinese()+'年 '+d.getMonthInChinese()+'月 '+d.getDayInChinese()+' (阴历)']);
    res.push(['佛历', foto.getYearInChinese()+'年 '+foto.getMonthInChinese()+'月 '+foto.getDayInChinese()]);
    res.push(['道历', tao.getYearInChinese()+'年 '+tao.getMonthInChinese()+'月 '+tao.getDayInChinese()]);
    res.push(['年', d.getYearInGanZhi()+'年 属'+d.getYearShengXiao()+' '+d.getYearNaYin()]);
    res.push(['月', d.getMonthInGanZhi()+'月 属'+d.getMonthShengXiao()+' '+d.getMonthNaYin()]);
    res.push(['日', d.getDayInGanZhi()+'日 属'+d.getDayShengXiao()+' '+d.getDayNaYin()]);
    res.push(['儒略日', s.getJulianDay()]);
    res.push(['月名', d.getSeason()]);
    res.push(['月相', d.getYueXiang()]);
    res.push(['物候', d.getHou() + '，' +d.getWuHou()]);
    res.push(['三元九运', lunarYear.getYuan() + ' ' + lunarYear.getYun()]);
    res.push(['治水', lunarYear.getZhiShui()]);
    res.push(['分饼', lunarYear.getFenBing()]);
    res.push(['耕田', lunarYear.getGengTian()]);
    res.push(['得金', lunarYear.getDeJin()]);
    res.push(['日禄', d.getDayLu()]);
    res.push(['六曜', d.getLiuYao()]);
    res.push(['彭祖百忌', d.getPengZuGan()+' '+d.getPengZuZhi()]);
    
    res.push(['今日宜', d.getDayYi().join(' ')]);
    res.push(['今日忌', d.getDayJi().join(' ')]);
    res.push(['吉神宜趋', d.getDayJiShen().join(' ')]);
    res.push(['凶煞宜忌', d.getDayXiongSha().join(' ')]);
    res.push(['相冲', d.getDayShengXiao()+'日 冲'+d.getChongDesc()]);
    res.push(['岁煞', d.getSha()]);
    res.push(['星宿', d.getGong()+'方'+d.getXiu()+d.getZheng()+d.getAnimal()+' ('+d.getXiuLuck()+')']);
    res.push(['星宿歌诀', d.getXiuSong()]);
    res.push(['贵神方位', '阳贵神：'+d.getPositionYangGuiDesc()+' 阴贵神：'+d.getPositionYinGuiDesc()]);
    res.push(['喜神方位', d.getPositionXiDesc()]);
    res.push(['福神方位', d.getPositionFuDesc()]);
    res.push(['财神方位', d.getPositionCaiDesc()]);
    res.push(['本月胎神', d.getMonthPositionTai()]);
    res.push(['今日胎神', d.getDayPositionTai()]);
    res.push(['太岁方位', d.getDayPositionTaiSuiDesc()]);
    res.push(['值星', d.getZhiXing()]);
    res.push(['十二天神', d.getDayTianShen()+'('+d.getDayTianShenType()+') '+ d.getDayTianShenLuck()]);
    res.push(['空亡所值', '年：'+d.getYearXunKong()+' 月：'+d.getMonthXunKong()+' 日：'+d.getDayXunKong()]);
    const jiuxing = d.getDayNineStar();
    res.push(['九星', jiuxing.getNumber()+jiuxing.getColor()+' - '+jiuxing.getNameInTaiYi()+'星('+jiuxing.getWuXing()+') - '+jiuxing.getTypeInTaiYi()]);
    res.push(['九星歌诀', jiuxing.getSongInTaiYi()]);

    var p = d.getPrevJieQi(),n = d.getNextJieQi();
    res.push(['上一节气', p.getName()+' '+p.getSolar().toYmdHms()+' 星期'+p.getSolar().getWeekInChinese()]);
    res.push(['下一节气', n.getName()+' '+n.getSolar().toYmdHms()+' 星期'+n.getSolar().getWeekInChinese()]);
    res.push(['阴历节日', d.getFestivals().join(', ')]);
    res.push(['其他阴历节日', d.getOtherFestivals().join(', ')]);
    res.push(['公历节日', s.getFestivals().join(', ')]);
    res.push(['其他公历节日', s.getOtherFestivals().join(', ')]);
    res.push(['佛历节日', foto.getFestivals().join(', ')]);
    res.push(['道历节日', tao.getFestivals().join(', ')]);
    res.push(['数九', d.getShuJiu()]);
    res.push(['三伏', d.getFu()]);

    const huang = res.map((obj, idx) => (
      <TableRow key={idx}>
        <TableCell component='th' scope="row" sx={{width: '25%'}}>{obj[0]}</TableCell>
        <TableCell>{obj[1]}</TableCell>
      </TableRow>
    ));
    setHuangLi(huang ? huang : <TableRow><TableCell>Empty</TableCell></TableRow>)
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

        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {huangLi}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </LocalizationProvider>
  );
}