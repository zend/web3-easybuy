
import React from "react";
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { deepOrange, deepPurple, indigo, orange, teal, cyan, brown } from "@mui/material/colors";
export default function Days() {
  const holidays = [
    {n:'元旦', d:'2022年1月1日至3日放假，共3天', b: ''},
    {n:'春节', d:'1月31日至2月6日放假调休，共7天', b:'1月29日（星期六）、1月30日（星期日）上班'},
    {n:'清明节', d:'4月3日至5日放假调休，共3天', b:'4月2日（星期六）上班'},
    {n:'劳动节', d:'4月30日至5月4日放假调休，共5天', b:'4月24日（星期日）、5月7日（星期六）上班。'},
    {n:'端午节', d:'6月3日至5日放假，共3天'},
    {n:'中秋节', d:'9月10日至12日放假，共3天'},
    {n:'国庆节', d:'10月1日至7日放假调休，共7天', b:'10月8日（星期六）、10月9日（星期日）上班'}
  ]
  const colors = [deepOrange, deepPurple, indigo, orange, teal, cyan, brown];
  const chooseColor = (idx) => colors[idx % colors.length];
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {holidays.map((h, idx) => (
        <ListItem alignItems="flex-start" key={idx}>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: chooseColor(idx)[500] }}>{h.n.substring(0,1)}</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={h.n}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {h.d}
                </Typography>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.secondary"><br />{h.b}</Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      ))}
      <Divider variant="inset" component="li" />
    </List>
  )
}