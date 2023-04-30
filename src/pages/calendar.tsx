import CalendarFrame, { CalColor } from "@site/src/components/Calendar";
import DefaultLayout from "@site/src/layouts/Default";

export default function Calendar(): JSX.Element {
  return (
    <DefaultLayout
      title="SC2 Event Calendar"
      description="Stay up to date with SC2's events in and around our community with our event calendar"
    >
      <CalendarFrame
        noTitle
        calendars={[
          {
            src: "Y19wcDlkOXRrbGRrbThmdXZtcjMyZTBwZTgxc0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t",
            color: CalColor.Gold,
          },
        ]}
      />
    </DefaultLayout>
  );
}
