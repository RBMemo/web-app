import { Flex, NavLink } from 'theme-ui';
import { AiFillMediumCircle, AiFillTwitterCircle } from 'react-icons/ai';
import { MdOutlineNoteAlt } from 'react-icons/md';
import { SiGitbook } from 'react-icons/si';
import './Footer.css'

function Footer() {
  const links = [
    { Image: AiFillMediumCircle, text: 'Medium', url: 'https://medium.com/@rb.rebase/897e426ed7e6' },
    { Image: AiFillTwitterCircle, text: 'Twitter', url: 'https://twitter.com/splitbaseFi' },
    { Image: SiGitbook, text: 'Docs', url: 'https://docs.splitbase.fi/' },
    { Image: MdOutlineNoteAlt, text: 'Feature Request', url: 'https://uqrtvol.ducalis.io/splitbase-feature-request' }
  ];

  return (
    <Flex className="FooterContainer">
      {links.map((info, i) => <ImageLink key={i} {...info} />)}
    </Flex>
  );
}

function ImageLink({ Image, text, url }) {
  return (
    <NavLink href={url} target="_blank"
    sx={{ fontSize: ['small', 'medium'] }} variant="withImage">
      <Image />
      {text}
    </NavLink>
  );
}

export default Footer;
