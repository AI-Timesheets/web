export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        icon: 'cil-speedometer'
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['Manage']
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Companies',
        to: '/theme/colors',
        icon: 'cil-drop'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Employees',
        to: '/theme/typography',
        icon: 'cil-pencil'
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['Components']
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Base',
        route: '/base',
        icon: 'cil-puzzle',
        items: [
          {
            name: 'Breadcrumbs',
            to: '/base/breadcrumbs',
            icon: 'cil-puzzle'
          },
          {
            name: 'Cards',
            to: '/base/cards',
            icon: 'cil-puzzle'
          },
          {
            name: 'Carousels',
            to: '/base/carousels',
            icon: 'cil-puzzle'
          },
          {
            name: 'Collapses',
            to: '/base/collapses',
            icon: 'cil-puzzle'
          },
          {
            name: 'Forms',
            to: '/base/forms',
            icon: 'cil-puzzle'
          },
          {
            name: 'Jumbotrons',
            to: '/base/jumbotrons',
            icon: 'cil-puzzle'
          },
          {
            name: 'List Groups',
            to: '/base/list-groups',
            icon: 'cil-puzzle'
          },
          {
            name: 'Navs',
            to: '/base/navs',
            icon: 'cil-puzzle'
          },
          {
            name: 'Navbars',
            to: '/base/navbars',
            icon: 'cil-puzzle'
          },
          {
            name: 'Paginations',
            to: '/base/paginations',
            icon: 'cil-puzzle'
          },
          {
            name: 'Popovers',
            to: '/base/popovers',
            icon: 'cil-puzzle'
          },
          {
            name: 'Progress Bars',
            to: '/base/progress-bars',
            icon: 'cil-puzzle'
          },
          {
            name: 'Switches',
            to: '/base/switches',
            icon: 'cil-puzzle'
          },
          {
            name: 'Tables',
            to: '/base/tables',
            icon: 'cil-puzzle'
          },
          {
            name: 'Tabs',
            to: '/base/tabs',
            icon: 'cil-puzzle'
          },
          {
            name: 'Tooltips',
            to: '/base/tooltips',
            icon: 'cil-puzzle'
          }
        ]
      },
    ]
  }
]
