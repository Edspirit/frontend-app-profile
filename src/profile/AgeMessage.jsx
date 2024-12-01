import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from '@openedx/paragon';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import useGetConfig from '../hooks/useGetConfig';

const AgeMessage = ({ accountSettingsUrl }) => {
  const { platformName } = useGetConfig();

  return (
    <Alert
      variant="info"
      dismissible={false}
      show
    >
      <Alert.Heading id="profile.age.headline">
        Your profile cannot be shared.
      </Alert.Heading>
      <FormattedMessage
        id="profile.age.details"
        defaultMessage="To share your profile with other {siteName} learners, you must confirm that you are over the age of 13."
        description="Error message"
        tagName="p"
        values={{
          siteName: platformName,
        }}
      />
      <Alert.Link href={accountSettingsUrl}>
        <FormattedMessage
          id="profile.age.set.date"
          defaultMessage="Set your date of birth"
          description="Label on a link to set birthday"
        />
      </Alert.Link>
    </Alert>
  );
};

AgeMessage.propTypes = {
  accountSettingsUrl: PropTypes.string.isRequired,
};

export default AgeMessage;
