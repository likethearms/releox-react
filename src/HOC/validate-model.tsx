import React, { Component, ElementType } from 'react';
import { getErrorMessage } from '../config';
import { ct } from '../I18N';
import { Loading } from '../components/Loading/Loading';
import { AuthLayout } from '../components/AuthLayout/AuthLayout';
import { FormikFormWrapper } from '../components/FormikFormWrapper/FormikFormWrapper';
import { Button } from '../components/Button/Button';
import { patchUserRequest } from '../requests';

/* eslint-disable react/jsx-props-no-spreading */

interface State {
  user: any;
  validationFail: boolean;
  loading: boolean;
  message: string;
}

interface Props {
  authenticatedUser: any;
}

const CONTEXT = 'ValidateModelMiddleware';

export const validateModel = (
  fields: string[],
  FormComponent: ElementType,
) => (WrapperElement: any) => (
  class ValidateModel extends Component<Props, State> {
    constructor(props: Props) {
      super(props);
      this.state = {
        user: {},
        validationFail: false,
        loading: true,
        message: '',
      };
      this.submit = this.submit.bind(this);
    }

    componentDidMount(): void {
      const { authenticatedUser } = this.props;
      const isValid = this.validateModel(authenticatedUser);
      this.setState({
        validationFail: !isValid,
        loading: false,
      });
    }

    getValidationForm(): JSX.Element {
      const { authenticatedUser } = this.props;
      const { message } = this.state;
      const t = ct('validateModel');
      return (
        <AuthLayout
          context={CONTEXT}
          message={message}
          title={t('title')}
          subTitle={t('subTitle')}
          links={[]}
        >
          <FormikFormWrapper onSubmit={this.submit} initialValues={authenticatedUser}>
            <div>
              <FormComponent />
              <Button type="submit" id="submit" className="float-right">
                {t('button')}
              </Button>
            </div>
          </FormikFormWrapper>
        </AuthLayout>
      );
    }

    submit(body: any): Promise<any> {
      const { authenticatedUser } = this.props;
      return patchUserRequest(authenticatedUser.id, body)
        .then(() => window.location.reload())
        .catch((error: Error) => this.setState({ message: getErrorMessage(error) }));
    }

    /**
     * Validate model
     * Validate model method run through all given requiredFields
     * and check that user model has every one of them.
     */
    validateModel(user: any): boolean {
      let valid = true;
      fields.forEach((field) => {
        if (!user[field]) {
          valid = false;
        }
      });
      return valid;
    }

    render(): JSX.Element {
      const { loading, validationFail } = this.state;
      if (loading) return <Loading centeredVertical />;
      if (validationFail) return this.getValidationForm();
      return <WrapperElement {...this.props} />;
    }
  }
);
