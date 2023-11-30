export type RedirectProps = {
  interval: number;

  redirect?: string;
};

export function Redirect(props: RedirectProps) {
  setTimeout(() => {
    if (window.location) {
      if (props.redirect) {
        window.location.href = props.redirect;
      } else {
        window.location.reload();
      }
    }
  }, props.interval);

  return <></>;
}
