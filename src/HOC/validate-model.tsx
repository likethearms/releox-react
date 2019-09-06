import React, { Component, ElementType } from 'react';
import Axios from 'axios';
import { getErrorMessage } from '../config';
import { ct } from '../I18N';
import { apis } from '../apis';
import { Loading } from '../components/Loading/Loading';
import { AuthLayout } from '../components/AuthLayout/AuthLayout';
import { FormikFormWrapper } from '../components/FormikFormWrapper/FormikFormWrapper';
import { Button } from '../components/Button/Button';

/* eslint-disable react/jsx-props-no-spreading */

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

export const validateModel = (fields: string[], form: ElementType) => (WrapperElement: any) => (
  class extends Component<Props, State> {
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
      const isValid = this.validateModel(user);
      this.setState({
        validationFail: !isValid,
        loading: false,
      });
    }

    getValidationForm(): JSX.Element {
      const { user } = this.props;
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

    submit(body: any): void {
      const { user } = this.props;
      Axios
        .patch(`${apis.PATCH}/${user.id}`, body)
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
      if (loading) return <Loading centeredVertical />;
      return <WrapperElement {...this.props} />;
    }
  }
);
