# 🛠️ Build Your Own Habit Tracker - Complete Google Sheets Guide

This guide provides **exact formulas, cell references, and step-by-step instructions** to build a fully functional habit tracker in Google Sheets from scratch.

---

## 📋 Table of Contents

1. [Sheet Structure Overview](#sheet-structure-overview)
2. [Main Tracker Tab Setup](#main-tracker-tab-setup)
3. [Day-Specific Tracking Formulas](#day-specific-tracking-formulas)
4. [Progress Calculation Formulas](#progress-calculation-formulas)
5. [Self-Check Zone Setup](#self-check-zone-setup)
6. [Weekly/Monthly/Yearly Tabs](#weekly-monthly-yearly-tabs)
7. [Dashboard & Visualizations](#dashboard--visualizations)
8. [Conditional Formatting](#conditional-formatting)
9. [Protection & Finishing Touches](#protection--finishing-touches)

---

## 📊 Sheet Structure Overview

### Required Tabs (Create These)

| Tab Name | Purpose |
|----------|---------|
| Main Tracker | Daily habit tracking with 30-day calendar |
| Self-Check | Sleep, water, mood tracking |
| Weekly Habits | Weekly habit tracking |
| Monthly Habits | Monthly goals |
| Yearly Habits | Yearly goals |
| Tasks | Task list with progress |
| Settings | Configuration and dropdowns |

### Recommended Layout

```
Main Tracker Tab:
┌─────────────────────────────────────────────────────────────────┐
│ Row 1-3:    Header (Month, Year, Title)                        │
│ Row 4-5:    Progress Summary (Today's Progress, Month Progress)│
│ Row 6:      Column Headers (Habit, Days, Goal, 1-31 dates)     │
│ Row 7-36:   Habit Rows (30 habits)                             │
│ Row 37-40:  Weekly Progress Section                            │
│ Row 41-55:  Top 15 Most Consistent Habits                      │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📋 Main Tracker Tab Setup

### Step 1: Create the Basic Structure

#### Column Layout

| Column | Content | Width |
|--------|---------|-------|
| A | Habit Name | 200px |
| B | Days Selected (dropdown) | 150px |
| C | Monthly Goal | 80px |
| D | Completed | 80px |
| E | % Complete | 80px |
| F-AJ | Days 1-31 (checkboxes) | 35px each |

#### Row Layout

| Row | Content |
|-----|---------|
| 1 | Month & Year Header |
| 2 | Progress Summary Title |
| 3 | Today's Progress Display |
| 4 | Month's Progress Display |
| 5 | Spacer Row |
| 6 | Column Headers |
| 7-36 | Habit Rows (30 habits) |
| 37 | Spacer Row |
| 38 | Weekly Progress Header |
| 39-42 | Week 1-4 Progress |

### Step 2: Set Up Headers

In cell **A1**, enter:
```
=CONCATENATE(TEXT(TODAY(),"MMMM")," ",YEAR(TODAY())," Habit Tracker")
```

In cell **A6** (column headers):
```
Habit Name | Days | Goal | Done | % | 1 | 2 | 3 | ... | 31
```

### Step 3: Add Checkboxes

Select cells **F7:AJ36** (dates columns for all habits)

Go to **Insert → Checkbox**

This creates interactive checkboxes for each day.

### Step 4: Create Day Header Row

In row 6, starting from column F, add day numbers 1-31.

In cell **F6**:
```
1
```

Then drag or use formula in **G6**:
```
=F6+1
```

Continue to column AJ (day 31).

---

## 🗓️ Day-Specific Tracking Formulas

### Setting Up Day Selection Dropdown

#### Step 1: Create Settings Tab

Create a new tab called "Settings" and add day options:

In **Settings!A1:A7**:
```
Mon
Tue
Wed
Thu
Fri
Sat
Sun
```

#### Step 2: Create Multi-Select Day Dropdown (Method 1 - Simplified)

For single-day selection, use Data Validation:

1. Select column B (Days column) in Main Tracker
2. Go to **Data → Data validation**
3. Set criteria to **List from a range**: `Settings!A1:A7`
4. Allow multiple selections

For multi-day selection (comma-separated):

In cell **B7**, use Data Validation with:
- Criteria: **List of items**
- Items: `Mon,Tue,Wed,Thu,Fri,Sat,Sun,Mon-Tue,Mon-Wed,Mon-Thu,Mon-Fri,Tue-Thu,Mon-Wed-Fri,Tue-Thu-Sat,Weekdays,Weekends,Daily`

### Day-Specific Checkbox Display

To show checkboxes only on selected days, use conditional logic.

#### Step 1: Create Day Name Row

In row 5 (hidden row for calculations), add day names for each date.

In cell **F5**:
```
=TEXT(DATE(YEAR(TODAY()),MONTH(TODAY()),F6),"ddd")
```

This returns "Mon", "Tue", etc. for each date column.

Drag this formula across to column AJ.

#### Step 2: Conditional Checkbox Formula

Instead of static checkboxes, use this formula in **F7**:

```
=IF(OR($B7="",$B7="Daily",ISNUMBER(SEARCH(LEFT(F$5,3),$B7))),FALSE,"")
```

**Explanation:**
- If Days column (B7) is empty OR "Daily" → show checkbox (FALSE = unchecked)
- If day name is found in the selected days → show checkbox
- Otherwise → show empty (no checkbox)

**Important:** After entering this formula, select the cell, go to **Format → Number → Checkbox** to make it display as a checkbox.

### Auto-Calculate Monthly Goal Based on Days

In the **Goal column (C7)**, use:

```
=IF(OR(B7="",B7="Daily"),31,
 IF(B7="Weekdays",SUMPRODUCT((WEEKDAY(DATE(YEAR(TODAY()),MONTH(TODAY()),ROW(INDIRECT("1:"&DAY(EOMONTH(TODAY(),0))))),2)<6)*1),
 IF(B7="Weekends",SUMPRODUCT((WEEKDAY(DATE(YEAR(TODAY()),MONTH(TODAY()),ROW(INDIRECT("1:"&DAY(EOMONTH(TODAY(),0))))),2)>5)*1),
 SUMPRODUCT(
   (ISNUMBER(SEARCH("Mon",B7))*(WEEKDAY(DATE(YEAR(TODAY()),MONTH(TODAY()),ROW(INDIRECT("1:"&DAY(EOMONTH(TODAY(),0))))),2)=1))+
   (ISNUMBER(SEARCH("Tue",B7))*(WEEKDAY(DATE(YEAR(TODAY()),MONTH(TODAY()),ROW(INDIRECT("1:"&DAY(EOMONTH(TODAY(),0))))),2)=2))+
   (ISNUMBER(SEARCH("Wed",B7))*(WEEKDAY(DATE(YEAR(TODAY()),MONTH(TODAY()),ROW(INDIRECT("1:"&DAY(EOMONTH(TODAY(),0))))),2)=3))+
   (ISNUMBER(SEARCH("Thu",B7))*(WEEKDAY(DATE(YEAR(TODAY()),MONTH(TODAY()),ROW(INDIRECT("1:"&DAY(EOMONTH(TODAY(),0))))),2)=4))+
   (ISNUMBER(SEARCH("Fri",B7))*(WEEKDAY(DATE(YEAR(TODAY()),MONTH(TODAY()),ROW(INDIRECT("1:"&DAY(EOMONTH(TODAY(),0))))),2)=5))+
   (ISNUMBER(SEARCH("Sat",B7))*(WEEKDAY(DATE(YEAR(TODAY()),MONTH(TODAY()),ROW(INDIRECT("1:"&DAY(EOMONTH(TODAY(),0))))),2)=6))+
   (ISNUMBER(SEARCH("Sun",B7))*(WEEKDAY(DATE(YEAR(TODAY()),MONTH(TODAY()),ROW(INDIRECT("1:"&DAY(EOMONTH(TODAY(),0))))),2)=7))
 ))))
```

**Simplified alternative** - Let user enter goal manually:

Just use a plain number input in column C and skip the auto-calculation.

---

## 📈 Progress Calculation Formulas

### Count Completed Habits (Column D)

In cell **D7** (Completed column):

```
=COUNTIF(F7:AJ7,TRUE)
```

This counts all checked boxes (TRUE values) in the habit row.

### Calculate Completion Percentage (Column E)

In cell **E7** (% Complete column):

```
=IFERROR(D7/C7,0)
```

Format this column as **Percentage** (Format → Number → Percent).

### Today's Progress Section

#### Today's Completed Count

In cell for "Today's Completed" (e.g., **C3**):

```
=SUMPRODUCT((INDIRECT("F7:F36")=TRUE)*1)
```

**Note:** Replace F with the column for today's date. Better formula using dynamic date:

```
=SUMPRODUCT((INDIRECT(ADDRESS(7,5+DAY(TODAY()))&":"&ADDRESS(36,5+DAY(TODAY())))=TRUE)*1)
```

#### Today's Goal Count

In cell for "Today's Goal" (e.g., **D3**):

```
=COUNTA(INDIRECT(ADDRESS(7,5+DAY(TODAY()))&":"&ADDRESS(36,5+DAY(TODAY()))))-COUNTBLANK(INDIRECT(ADDRESS(7,5+DAY(TODAY()))&":"&ADDRESS(36,5+DAY(TODAY()))))
```

Or simplified (counts non-empty cells in today's column):

```
=SUMPRODUCT((INDIRECT(ADDRESS(7,5+DAY(TODAY()))&":"&ADDRESS(36,5+DAY(TODAY())))<>"")*1)
```

#### Today's Progress Percentage

```
=IFERROR(C3/D3,0)
```

### Monthly Progress Summary

#### Total Completed This Month

In a summary cell:

```
=SUM(D7:D36)
```

#### Total Monthly Goal

```
=SUM(C7:C36)
```

#### Monthly Progress Percentage

```
=IFERROR(SUM(D7:D36)/SUM(C7:C36),0)
```

### Weekly Progress Calculations

#### Week 1 Progress (Days 1-7)

**Week 1 Completed:**
```
=SUMPRODUCT((F7:L36=TRUE)*1)
```

**Week 1 Goal:**
```
=SUMPRODUCT((F7:L36<>"")*1)
```

**Week 1 Percentage:**
```
=IFERROR(SUMPRODUCT((F7:L36=TRUE)*1)/SUMPRODUCT((F7:L36<>"")*1),0)
```

#### Week 2 Progress (Days 8-14)

**Week 2 Completed:**
```
=SUMPRODUCT((M7:S36=TRUE)*1)
```

**Week 2 Goal:**
```
=SUMPRODUCT((M7:S36<>"")*1)
```

#### Week 3 Progress (Days 15-21)

**Week 3 Completed:**
```
=SUMPRODUCT((T7:Z36=TRUE)*1)
```

#### Week 4 Progress (Days 22-28)

**Week 4 Completed:**
```
=SUMPRODUCT((AA7:AG36=TRUE)*1)
```

#### Week 5 Progress (Days 29-31)

**Week 5 Completed:**
```
=SUMPRODUCT((AH7:AJ36=TRUE)*1)
```

### Top 15 Most Consistent Habits

This requires sorting habits by completion percentage.

#### Create a Ranking Section

In a new section (rows 45-60), create columns for:
- Rank (1-15)
- Habit Name
- Completion %

#### Ranking Formula

In the Habit Name cell for Rank 1 (e.g., **B45**):

```
=IFERROR(INDEX($A$7:$A$36,MATCH(LARGE($E$7:$E$36,ROW()-44),$E$7:$E$36,0)),"")
```

In the Percentage cell (e.g., **C45**):

```
=IFERROR(LARGE($E$7:$E$36,ROW()-44),"")
```

**Note:** Adjust row numbers based on your actual layout. The formula assumes:
- Habit names are in A7:A36
- Percentages are in E7:E36
- Ranking starts at row 45

Drag these formulas down for ranks 1-15.

---

## 💤 Self-Check Zone Setup

### Tab: Self-Check

Create a new tab called "Self-Check" with the following structure:

### Sleep Tracking Section

#### Layout

| Column | Content |
|--------|---------|
| A | Day Number (1-31) |
| B | Date |
| C | Hours Slept |
| D | Sleep Goal |
| E | Met Goal? |

#### Formulas

**Date (Column B, row 2):**
```
=DATE(YEAR(TODAY()),MONTH(TODAY()),A2)
```

**Sleep Goal (Column D)** - Set a constant (e.g., 8 hours)

**Met Goal? (Column E, row 2):**
```
=IF(C2>=D2,"✅","❌")
```

#### Sleep Average

```
=AVERAGE(C2:C32)
```

#### Days Met Sleep Goal

```
=COUNTIF(E2:E32,"✅")
```

### Water Intake Tracking

#### Layout

| Column | Content |
|--------|---------|
| F | Day Number |
| G | Glasses/Liters |
| H | Water Goal |
| I | Met Goal? |

#### Formulas

**Met Goal? (Column I):**
```
=IF(G2>=H2,"✅","❌")
```

**Average Daily Intake:**
```
=AVERAGE(G2:G32)
```

### Mood Tracking

#### Layout

| Column | Content |
|--------|---------|
| J | Day Number |
| K | Mood (emoji/text) |

#### Mood Options (Data Validation)

Create a list in Settings tab:
```
😁 Amazing
😊 Good
😐 Okay
😔 Sad
😞 Not Good
```

Apply Data Validation to column K.

#### Mood Distribution Counts

**Amazing days:**
```
=COUNTIF(K2:K32,"*Amazing*")
```

**Good days:**
```
=COUNTIF(K2:K32,"*Good*")
```

Repeat for each mood.

---

## 📅 Weekly/Monthly/Yearly Tabs

### Weekly Habits Tab

#### Structure

| Column | Content |
|--------|---------|
| A | Weekly Habit Name |
| B | Week 1 Checkbox |
| C | Week 2 Checkbox |
| D | Week 3 Checkbox |
| E | Week 4 Checkbox |
| F | Week 5 Checkbox |
| G | Completed Count |
| H | Goal (5 weeks) |
| I | % Complete |

#### Formulas

**Completed Count (G2):**
```
=COUNTIF(B2:F2,TRUE)
```

**% Complete (I2):**
```
=IFERROR(G2/H2,0)
```

### Monthly Habits Tab

#### Structure

| Column | Content |
|--------|---------|
| A | Monthly Habit Name |
| B | Checkbox (Done?) |
| C | Target (e.g., 3 times) |
| D | Completed Count |
| E | % Complete |

For habits done multiple times per month, use multiple checkbox columns.

### Yearly Habits Tab

#### Structure

| Column | Content |
|--------|---------|
| A | Yearly Goal Name |
| B-M | Months (Jan-Dec) checkboxes |
| N | Completed Count |
| O | Goal |
| P | % Complete |

#### Formulas

**Completed Count (N2):**
```
=COUNTIF(B2:M2,TRUE)
```

---

## 📊 Dashboard & Visualizations

### Creating Progress Bars (Text-Based)

Use REPT function for simple progress bars.

**Progress Bar Formula:**

```
=REPT("█",ROUND(E7*10,0))&REPT("░",10-ROUND(E7*10,0))&" "&TEXT(E7,"0%")
```

This creates: `████████░░ 80%`

### Creating Sparklines

Google Sheets supports sparklines for mini-charts.

**Weekly Progress Sparkline:**

```
=SPARKLINE({Week1%,Week2%,Week3%,Week4%},{"charttype","column";"max",1;"color1","#4CAF50"})
```

Replace Week1%, etc. with actual cell references.

### Creating Charts

#### Pie Chart for Mood Distribution

1. Select mood count data
2. Insert → Chart
3. Choose Pie Chart
4. Customize colors

#### Line Chart for Sleep Tracking

1. Select date and hours slept columns
2. Insert → Chart
3. Choose Line Chart
4. Add goal line as secondary series

#### Bar Chart for Weekly Progress

1. Select week labels and progress percentages
2. Insert → Chart
3. Choose Bar Chart
4. Apply gradient colors

### Donut Chart for Today's Progress

1. Create two cells: Completed, Remaining
2. Remaining = Goal - Completed
3. Insert → Chart
4. Choose Donut Chart
5. Set colors (green for completed, gray for remaining)

---

## 🎨 Conditional Formatting

### Color-Code Progress Percentages

Apply to column E (% Complete):

1. Select E7:E36
2. Format → Conditional formatting
3. Add rules:

**Rule 1 - Green (>=80%):**
- Format cells if: Greater than or equal to 0.8
- Background color: #C8E6C9 (light green)

**Rule 2 - Yellow (50-79%):**
- Format cells if: Is between 0.5 and 0.79
- Background color: #FFF9C4 (light yellow)

**Rule 3 - Red (<50%):**
- Format cells if: Less than 0.5
- Background color: #FFCDD2 (light red)

### Highlight Checked Boxes

Apply to checkbox range F7:AJ36:

1. Format → Conditional formatting
2. Custom formula: `=F7=TRUE`
3. Background color: #4CAF50 (green)

### Highlight Today's Column

1. Select date header row and checkbox columns
2. Custom formula: `=F$6=DAY(TODAY())`
3. Background color: #E3F2FD (light blue)

### Strikethrough Completed Habits

Apply to habit name column when 100% complete:

1. Select A7:A36
2. Custom formula: `=$E7>=1`
3. Text formatting: Strikethrough, gray text

---

## 🔒 Protection & Finishing Touches

### Protect Formula Cells

1. Select formula cells (progress columns, calculated fields)
2. Format → Number → Locked (if available)
3. Or use sheet protection:
   - Data → Protected sheets and ranges
   - Select range to protect
   - Set permissions

### Allow Checkbox Editing

When protecting, ensure checkbox columns remain editable:

1. Data → Protected sheets and ranges
2. Set protection for formulas only
3. Add exception for F7:AJ36 (checkbox range)

### Hide Helper Rows/Columns

If you have calculation helper rows (like day names in row 5):

1. Right-click the row number
2. Click "Hide row"

### Freeze Header Rows

1. Select row 6 (or below your headers)
2. View → Freeze → Up to row 6

### Freeze First Column

1. View → Freeze → 1 column

This keeps habit names visible when scrolling.

### Add Month/Year Selector

Create dropdowns to change the active month:

1. In Settings tab, list months and years
2. Create dropdown in Main Tracker header
3. Update date formulas to reference selected month/year

### Final Checklist

- [ ] All formulas working correctly
- [ ] Checkboxes functional
- [ ] Progress updates in real-time
- [ ] Conditional formatting applied
- [ ] Charts/visualizations added
- [ ] Headers frozen
- [ ] Formula cells protected
- [ ] Helper rows hidden
- [ ] Day-specific tracking working
- [ ] Self-check zone complete
- [ ] Weekly/monthly/yearly tabs set up
- [ ] Mobile-friendly layout (optional)

---

## 🚀 Quick Build Summary

### Minimum Viable Tracker (30 minutes)

1. Create Main Tracker tab
2. Add habit names in column A (rows 7-21)
3. Add checkbox grid (Insert → Checkbox) in F7:AJ21
4. Add completion count formula: `=COUNTIF(F7:AJ7,TRUE)`
5. Add goal column (manual entry)
6. Add percentage: `=IFERROR(D7/C7,0)`
7. Format percentage column
8. Add basic conditional formatting
9. Done!

### Full Featured Tracker (2-3 hours)

1. Complete the minimum viable tracker
2. Add day-specific formulas
3. Add progress summary section
4. Add weekly progress calculations
5. Add top 15 ranking
6. Create Self-Check tab
7. Add charts and visualizations
8. Apply full conditional formatting
9. Set up protection
10. Test everything!

---

## 📝 Formula Reference Card

| Purpose | Formula |
|---------|---------|
| Count checkboxes | `=COUNTIF(range,TRUE)` |
| Calculate percentage | `=IFERROR(completed/goal,0)` |
| Today's date | `=TODAY()` |
| Day of week | `=TEXT(date,"ddd")` |
| Days in current month | `=DAY(EOMONTH(TODAY(),0))` |
| Progress bar | `=REPT("█",ROUND(pct*10,0))&REPT("░",10-ROUND(pct*10,0))` |
| Rank values | `=LARGE(range,rank_number)` |
| Find matching value | `=INDEX(names,MATCH(value,range,0))` |
| Average | `=AVERAGE(range)` |
| Sum if condition | `=SUMIF(range,criteria)` |
| Count if contains | `=COUNTIF(range,"*text*")` |

---

## 💡 Tips for Success

1. **Start simple** - Build the basic tracker first, then add features
2. **Test as you go** - Check formulas work before moving on
3. **Use named ranges** - Makes formulas easier to read and maintain
4. **Document your formulas** - Add comments in helper cells
5. **Back up regularly** - Google Sheets has version history
6. **Mobile test** - Check it works on your phone
7. **Ask for help** - Google Sheets community forums are helpful

---

## 🎉 You Did It!

You now have all the formulas and knowledge to build a complete habit tracker in Google Sheets. This is YOUR tracker - customize it however you want!

**Key features you can build:**
- ✅ 30 daily habits with checkboxes
- ✅ Day-specific assignment
- ✅ Automatic progress calculation
- ✅ Weekly/monthly progress bars
- ✅ Top 15 consistency ranking
- ✅ Sleep, water, mood tracking
- ✅ Beautiful visualizations
- ✅ Protected formulas

**Happy habit tracking! 🚀**

---

*Need help? See [SETUP_GUIDE.md](SETUP_GUIDE.md) for usage instructions or [FEATURES.md](FEATURES.md) for feature details.*
