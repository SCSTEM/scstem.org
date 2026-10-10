# Content to-do

Open items from the October 2026 content pass. **Questions** are decisions only the owner can
make. **To-do** items are facts or photos to gather, each naming the file it unblocks.

## To-do

### Seasons (`src/content/frc/robots/`)

Each season file lists the game, events, best result, and awards, checked against
[The Blue Alliance](https://www.thebluealliance.com/team/4050). Missing:

- [ ] **Robot photos** (one on-field shot per robot, landscape): 2012, 2013, 2014, 2015
      (Anonymous), 2016 (Dialga, The Steel Dragon), 2017 (Boiling Point), 2018, 2025, 2026.
      Goes in `src/assets/frc/robots/`, plus `image` and `imageAlt` in the season file.
- [ ] **Robot names**: 2012, 2013, 2014, 2018, 2025, 2026. The Blue Alliance shows 2018 as
      "Boiling Point", the same as 2017. Confirm whether that's real or a copy.
- [ ] **Confirm names**: 2015 "Anonymous" and 2016 "Dialga, The Steel Dragon", as The Blue
      Alliance spells them.
- [ ] **2026 game name**: left blank until confirmed (`2026.md`).
- [ ] **A paragraph per robot**: what it did and what made it unusual, for every season
      without one (2012–2018, 2025, 2026).
- [ ] **O'Mega (2022)**: the old entry said it "won us a spot in the finals". The Blue Alliance
      shows quarterfinal exits at both 2022 regionals, so the entry now says that. Confirm, or
      tell me which event had the finals run.

### FRC logistics (`src/data/site.ts`, `programs.frc`)

- [ ] Which night the team meets weekly in the off-season (April–December).

### FLL (`src/data/site.ts`, `programs.fll`; `src/pages/programs/fll/index.astro`)

- [ ] Number of teams this season, and students per team.
- [ ] Meeting days, times, and season months.
- [ ] Cost per student, if it differs from "low to no cost".
- [ ] Tournaments the teams attend, and roughly when.
- [ ] The new FLL age range (it's changing); then update `programs.fll.ages`.
- [ ] **New alt text** for `src/content/fll/team-photos/2024.md`. It's now the FLL hero, and
      "The FIRST LEGO League teams in 2024" doesn't describe the photo.
- [ ] When the FLL ages change, also update the answer in `src/content/faq/what-age-to-join.md`,
      which states them in prose.

### Proof

- [ ] More alumni (`src/content/alumni/`): one file per alumnus, giving only the field they work in.
- [ ] **Outreach one-liners** (`src/content/outreach/`): each 2026 appearance now has a drafted
      `description` of what the teams did there. Confirm or correct each one; the JLG Next Gen STEM
      line in particular is a guess at the event's format.
- [ ] Past outreach years (`src/content/outreach/`): 2025 and earlier appearances, each with its
      kind and month.
- [ ] Numbers you can stand behind: students served since 2012, alumni in STEM degrees,
      scholarships won.

### Photos (shot list)

Landscape, students' faces visible where you have consent, taken during real work rather than
posed. Each one removes a repeat or an empty spot:

- [ ] **FLL, mid-build:** a team at a table with its robot and the mission mat, for the FLL hero
      (`src/pages/programs/fll/index.astro`).
- [ ] **FLL at a tournament:** a team at the competition table, for the FLL page.
- [ ] **A robot demo at an outreach event:** for example Old Market Day, with a crowd. Goes on the
      About page's community section and the Get involved schools card.
- [ ] **Mentors with students:** a mentor and a student working on something together, for the
      FRC mentors section.
- [ ] **Awards:** a larger original of `src/assets/sc2/award.webp` (currently 869px wide), or a
      new photo of an award moment, for the FRC page's awards timeline.
- [ ] **_FIRST_ at a glance:** a wide shot of a match on the field at a _FIRST_ event, with the
      arena and its _FIRST_ branding in frame, for the home page's "What is _FIRST_?" section
      (`src/pages/index.astro`). It stands in with the team cheering in the stands, which the
      kickoff event page also uses.
- [ ] **The workspace:** a wide interior shot of downtown Chambersburg, for "When and where we
      meet" on the FRC page and the FLL page.
