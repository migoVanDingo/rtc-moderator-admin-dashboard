import { faComments } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Burger, Menu } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import {
  IconMessage2,
  IconMessageCircle,
  IconPhoto,
  IconTrash
} from '@tabler/icons-react';
import styled from 'styled-components';
import Heading from '../common/functional/text/Heading';
import { SFlexRow } from '../common/styled/SFlexContainer';

const SHeaderContainer = styled(SFlexRow)`
  width: 100vw;
  height: 60px;
  padding: ${({ theme }) => theme.styles.container.padding.small} ${({ theme }) => theme.styles.container.padding.large};
  border: 1px solid ${({ theme }) => theme.styles.colors.grey_10};
  position:relative;
  top:0;
  margin: 0;
  gap: ${({ theme }) => theme.styles.container.padding.medium};
`;

const SRowContainer = styled(SFlexRow)`
  align-items: center;
  gap: ${({ theme }) => theme.styles.container.padding.small};
  &.align-right {
    margin-left: auto;
  }
`;

const SIcon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.styles.colors.blue_3};
  font-size: ${({ theme }) => theme.styles.heading.size.h2};
  margin: 0 0.5rem;
`;

const Header = ({ username, setMobileView }: any) => {
  const [opened, { toggle }] = useDisclosure();
  const isLargeScreen = useMediaQuery('(min-width: 768px)'); // Detect tablet and above

  return (
    <SHeaderContainer id="header">
      <SRowContainer>
        <SIcon icon={faComments} />
        <Heading heading={`Admin Dashboard`} styles={"f-weight-400 f-md"} />

      </SRowContainer>

      <SRowContainer className={"align-right"}>
        <Heading heading={`Admin:`} styles={"f-weight-400 f-sm"} />
        <Heading heading={username} styles={"f-weight-400 f-sm"} />
      </SRowContainer>

      {/* Dropdown menu tied to the burger */}
      <Menu shadow="md" width={200} opened={opened} onClose={() => toggle()}>
        {/* Burger component is the target */}
        <Menu.Target>
          <SRowContainer>
            <Burger opened={opened} onClick={toggle} aria-label="Toggle navigation" />
          </SRowContainer>
        </Menu.Target>

        <Menu.Dropdown>
          {isLargeScreen ? (
            // Show only "Logout" for large screens
            <Menu.Item color="red" leftSection={<IconTrash size={14} />}>Logout</Menu.Item>
          ) : (
            // Show additional options for smaller screens
            <>
             
              <Menu.Item  onClick={() => setMobileView("chat-list")}  leftSection={<IconPhoto size={14} />}>Chatrooms</Menu.Item>
              <Menu.Item  onClick={() => setMobileView("main")}  leftSection={<IconMessage2 size={14} />}>Main Chat</Menu.Item>
              <Menu.Item onClick={() => setMobileView("user-list")} leftSection={<IconMessageCircle size={14} />}>User List</Menu.Item>
              <Menu.Item color="red" leftSection={<IconTrash size={14} />}>Logout</Menu.Item>
            </>
          )}
        </Menu.Dropdown>
      </Menu>
    </SHeaderContainer>
  );
};

export default Header;
