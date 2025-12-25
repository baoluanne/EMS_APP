import ReactMuiDialog from '@mui/material/Dialog';
import { DialogProps } from '@mui/material/Dialog/Dialog';
import { useRouterContext } from '@renderer/routes/router.context';
import { deepmerge } from '@mui/utils';

type DialogExtendedProps = DialogProps & {
  global?: boolean;
};

export function Dialog(props: DialogExtendedProps) {
  const routerContext = useRouterContext();
  const getContainer = () => {
    return document.querySelector(`#tab-${routerContext.key}`);
  };
  const { global, ...dialogProps } = props;
  const rootProps = deepmerge<DialogExtendedProps>(
    {
      disableEnforceFocus: true,
      container: !global ? getContainer : null,
    } as DialogExtendedProps,
    dialogProps,
    {
      clone: true,
    },
  );

  return <ReactMuiDialog {...rootProps} />;
}
