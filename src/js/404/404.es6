import Ractive from 'ractive';
import html from './404.ract';

class NotFound {

  render() {
    this.ractive = new Ractive({
      el: 'view',
      template: html
    });
  }
  
  unrender() {
    return this.ractive.teardown();
  }
}

export default NotFound;
