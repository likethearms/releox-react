import React, { Component, ElementType } from 'react';
import Axios from 'axios';
import AuthLayout from '../components/AuthLayout/AuthLayout';
import apis from '../apis';
import { getErrorMessage } from '../config';
import Loading from '../components/Loading/Loading';
import FormikFormWrapper from '../components/FormikFormWrapper/FormikFormWrapper';
import Button from '../components/Button/Button';
import { ct } from '../I18N';

interface State {
  user: any;
  validationFail: boolean;
  loading: boolean;
  message: string;
}

interface Props {
  user: any;
}

const CONTEXT = 'ValidateModelMiddleware';

/* eslint-disable react/jsx-props-no-spreading */
export default (requiredFields: string[], form: ElementType, WrapperElement: any) => (
  class ValidateModelMiddleware extends Component<Props, State> {
    static validateModel(user: any): boolean {
      let valid = true;
      requiredFields.forEach((field) => {
        if (!user[field]) valid = false;
      });
      return valid;
    }

    constructor(props: Props) {
      super(props);
      this.submit = this.submit.bind(this);
      this.state = {
        user: {},
        validationFail: false,
        loading: true,
        message: '',
      };
    }

    componentDidMount(): void {
      const { user } = this.props;
      const isValid = ValidateModelMiddleware.validateModel(user);
      this.setState({
        validationFail: !isValid,
        loading: false,
      });
    }

    submit(body: any): void {
      const { user } = this.props;
      Axios
        .patch(`${apis.PATCH}/${user.id}`, body)
        .then(() => window.location.reload())
        .catch((error: Error) => this.setState({ message: getErrorMessage(error) }));
    }

    render(): JSX.Element {
      const { message, loading, validationFail } = this.state;
      const { user } = this.props;
      const t = ct('validateModel');
      if (loading) return <Loading centeredVertical />;
      if (validationFail) {
        return (
          <AuthLayout
            context={CONTEXT}
            message={message}
            title={t('title')}
            subTitle={t('subTitle')}
            links={[]}
          >
            <FormikFormWrapper onSubmit={this.submit} initialValues={user}>
              <div>
                {form}
                <Button type="submit" id="submit" className="float-right">
                  {t('button')}
                </Button>
              </div>
            </FormikFormWrapper>
          </AuthLayout>
        );
      }
      if (loading) return <Loading centeredVertical />;
      return <WrapperElement {...this.props} />;
    }
  }
);
