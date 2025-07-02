import React, { useState, useRef } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { TextField, InputAdornment } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import dayjs from "dayjs";

const CustomDateTimePicker = ({ selectedDate, onDateChange }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div
        ref={containerRef}
        className="datetime-picker-container"
        style={{ position: "relative", overflow: "visible" }}
      >
        {/* Custom Text Field */}
        <TextField
          value={selectedDate ? dayjs(selectedDate).format("MM/DD/YYYY hh:mm:ss A") : ""}
          placeholder="MM/DD/YYYY hh:mm:ss A"
          fullWidth
          onClick={() => setOpen(true)}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <CalendarMonthIcon
                  sx={{ color: "#777", cursor: "pointer" }}
                  onClick={() => setOpen(true)}
                />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              backgroundColor: "#fff",
              cursor: "pointer",
            },
            "& fieldset": { border: "1px solid #ccc" },
          }}
        />

        {/* Date Picker (Hidden Text Field) */}
        <DemoContainer
          components={["DateTimePicker"]}
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",
            zIndex: 1500,
          }}
        >
          <DateTimePicker
            value={selectedDate}
            onChange={onDateChange}
            shouldDisableDate={(date) => dayjs(date).isBefore(dayjs(), "day")}
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            format="MM/DD/YYYY hh:mm:ss A"
            ampm={true}
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
              seconds: renderTimeViewClock,
            }}
            PopperProps={{
              disablePortal: true,
              modifiers: [
                {
                  name: "preventOverflow",
                  options: {
                    boundary: "window",
                    padding: 8,
                  },
                },
                {
                  name: "flip",
                  options: {
                    flipVariations: false,
                  },
                },
              ],
              container: containerRef.current,
            }}
            slotProps={{
              textField: { style: { display: "none" } },
            }}
          />
        </DemoContainer>
      </div>
    </LocalizationProvider>
  );
};

export default CustomDateTimePicker;
