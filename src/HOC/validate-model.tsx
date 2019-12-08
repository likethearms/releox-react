import { Formik, Form } from 'formik';
import React, { Component, ElementType } from 'react';
import { getErrorMessage } from '../config';
import { Loading } from '../components/Loading/Loading';
import { AuthLayout } from '../components/AuthLayout/AuthLayout';
import { Button } from '../components/Button/Button';
import { patchUserRequest } from '../requests';
import { useTranslation } from 'react-i18next';

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

export const validateModel = (fields: string[], FormComponent: ElementType) => (
  WrapperElement: any
) =>
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
      const { t } = useTranslation('validateModel');
      return (
        <AuthLayout
          context={CONTEXT}
          message={message}
          title={t('title')}
          subTitle={t('subTitle')}
          links={[]}
        >
          <Formik onSubmit={this.submit} initialValues={authenticatedUser}>
            {() => (
              <Form>
                <FormComponent />
                <Button type="submit" id="submit" className="float-right">
                  {t('button')}
                </Button>
              </Form>
            )}
          </Formik>
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
  };
