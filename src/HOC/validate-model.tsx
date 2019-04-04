import React, { Component } from 'react';
import AuthLayout from '../components/AuthLayout/AuthLayout';
import apis from '../apis';
import { getErrorMessage } from '../config';
import Axios from 'axios';
import Loading from '../components/Loading/Loading';
import FormikFormWrapper from '../components/FormikFormWrapper/FormikFormWrapper';
import Button from '../components/Button/Button';
import { ct } from '../I18N';
import { ButtonType } from '../typings';

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

export default (
  requiredFields: string[],
  Form: () => JSX.Element,
  WrapperElement: any) => (
    class ValidateModelMiddleware extends Component<Props, State> {
      state: State = {
        user: {},
        validationFail: false,
        loading: true,
        message: '',
      };

      componentWillMount(): void {
        const { user } = this.props;
        const isValid = this.validateModel(user);
        this.setState({
          validationFail: !isValid,
          loading: false,
        });
      }

      validateModel(user: any): boolean {
        let valid = true;
        requiredFields.forEach((field) => {
          if (!user[field]) valid = false;
        });
        return valid;
      }

      submit(body: any): void {
        const { user } = this.props;
        Axios
          .patch(`${apis.PATCH}/${user.id}`, body)
          .then(() => window.location.reload())
          .catch(error => this.setState({ message: getErrorMessage(error) }));
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
              <FormikFormWrapper onSubmit={this.submit.bind(this)} initialValues={user}>
                <div>
                  {Form}
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
