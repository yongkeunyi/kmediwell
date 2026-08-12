import { Component, type ErrorInfo, type ReactNode } from "react";
import { useLocale, type Locale, type TKey } from "../lib/i18n";

interface Props {
  children: ReactNode;
  locale: Locale;
  t: (key: TKey) => string;
}

interface State {
  error: Error | null;
}

class ErrorBoundaryImpl extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Unhandled UI error:", error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="screen-pad">
          <p className="form-error">{this.props.t("error.boundaryMessage")}</p>
          <button className="btn btn-ghost" onClick={() => this.setState({ error: null })}>
            {this.props.t("error.retry")}
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export function ErrorBoundary({ children }: { children: ReactNode }) {
  const { locale, t } = useLocale();
  return (
    <ErrorBoundaryImpl locale={locale} t={t}>
      {children}
    </ErrorBoundaryImpl>
  );
}
