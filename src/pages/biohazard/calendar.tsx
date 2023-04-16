import CalendarFrame, { CalColor } from "@site/src/components/Calendar";
import DefaultLayout from "@site/src/layouts/Default";

export default function Calendar(): JSX.Element {
  return (
    <DefaultLayout>
      <CalendarFrame
        noTitle
        calendars={[
          {
            src: "Y19hYjljNWJlYTEwODgyYzAxYTAxOGNiZDUxYWIyMzcwYmY4NDk5NDZiZTRlMjUzNTAwZmZmMWQxMGZkY2M4NjFhQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20",
            color: CalColor.Gold,
          },
        ]}
      />
    </DefaultLayout>
  );
}
