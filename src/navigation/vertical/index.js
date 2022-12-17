// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import ShieldOutline from 'mdi-material-ui/ShieldOutline'

const navigation = () => {
  return [
    {
      title: 'Home',
      icon: HomeOutline,
      path: '/home'
    },
    {
      title: 'Second Page',
      icon: EmailOutline,
      path: '/second-page'
    },
    {
      title: 'Access Control',
      icon: ShieldOutline,
      path: '/acl',
      action: 'read',
      subject: 'acl-page'
    },
    {
      title: 'Afet İşlemleri',
      icon: ShieldOutline,
      children: [
        {
          title: 'Afet Olustur',
          path: '/disaster/create',
          action: 'create',
          subject: 'disaster'
        },
        {
          title: 'Afet Listele',
          path: '/disaster/list',
          action: 'read',
          subject: 'disaster'
        }
      ]
    }
  ]
}

export default navigation
