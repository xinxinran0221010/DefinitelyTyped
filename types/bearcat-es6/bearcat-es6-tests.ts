import * as bearcat from 'bearcat-es6';
import {
    ApplicationContext,
    AsyncScriptLoader,
    BeanFactory,
    BootStrapLoader,
    ModuleFactory,
    ResourceLoader,
} from './index';

const EF: Function = () => {};

bearcat.createApp({}); // $ExpectType Bearcat
bearcat.start(() => {
    bearcat.getBeanByMeta({});                 // $ExpectType object
    bearcat.getBeanByFunc(EF);                      // $ExpectType object
    bearcat.use('beanId');
    bearcat.module(EF, null);
    bearcat.define('testId', EF, null);
    bearcat.require('testId');
    bearcat.getBean('testId');
    bearcat.getFunction('testId');      //$ExpectType Function
    bearcat.getClass('testId');         //$ExpectType Function
    bearcat.extend('testSubId', 'testId');
    bearcat.call('testId', null);
    bearcat.getModel('testSubId');
    bearcat.getRoute('testId', 'controllerEntry');

    let applicationContext: ApplicationContext = bearcat.getApplicationContext(); // $ExpectType ApplicationContext
    applicationContext.init();
    applicationContext.setStartupDate(Date.now());
    applicationContext.getStartupDate();                                // $ExpectType number
    applicationContext.getResource('/a/c/b');                     // $ExpectType object
    applicationContext.getConfigLocations();                            // $ExpectType string[]
    applicationContext.addBeanFactoryPostProcessor({postProcessBeanFactory: EF});
    applicationContext.getBeanFactoryProcessors();                      // $ExpectType object[]
    applicationContext.refresh();
    applicationContext.refresh(EF);
    applicationContext.isActive();
    applicationContext.getBean('testId');
    applicationContext.getBeanByMeta({});
    applicationContext.getBeanByFunc(EF);
    applicationContext.getModel('mId');
    applicationContext.getModelDefinition('mId');
    applicationContext.getBeanFunction('testId');
    applicationContext.extendBean('testId', ['testParentId']);
    applicationContext.doExtendBean('testId', 'testParentId');
    applicationContext.module(EF, null);
    applicationContext.define('testNewId', EF, null);
    applicationContext.require('testNewId');
    applicationContext.use(['testId']);
    applicationContext.async(['testId']);
    applicationContext.containsBean('testId');      // $ExpectType boolean
    applicationContext.isSingleton('testId');       // $ExpectType boolean
    applicationContext.isPrototype('testId');       // $ExpectType boolean
    applicationContext.containsBeanDefinition('testId');       // $ExpectType boolean
    applicationContext.isRunning();                           // $ExpectType boolean
    applicationContext.hasBeanFactory();                      // $ExpectType boolean
    applicationContext.getBeanDefinition('testId');
    applicationContext.removeBeanDefinition('testNewId');
    applicationContext.setEnv('testing');
    applicationContext.getEnv();                            // $ExpectType string
    applicationContext.setConfigPath('./config');
    applicationContext.getConfigPath();
    applicationContext.setHotPath('./src');
    applicationContext.getHotPath();
    applicationContext.getBase();

    let asyncScriptLoader: AsyncScriptLoader = applicationContext.getAsyncScriptLoader(); // $ExpectType AsyncScriptLoader
    asyncScriptLoader.getLoadBeans();
    asyncScriptLoader.load(['abc'], EF);
    asyncScriptLoader.save('/a/b', {});
    asyncScriptLoader.module('mId', {});
    asyncScriptLoader.resolve('mId', '');       // $ExpectType string
    asyncScriptLoader.resolveDeps({});
    asyncScriptLoader.getPathById('mId');
    asyncScriptLoader.get('/a/b', []);
    asyncScriptLoader.setApplicationContext(applicationContext);

    let bootStrapLoader: BootStrapLoader = applicationContext.getBootStrapLoader(); // $ExpectType BootStrapLoader
    bootStrapLoader.load(['a']);

    let resourceLoader: ResourceLoader = applicationContext.getResourceLoader();    // $ExpectType ResourceLoader
    resourceLoader.addLoadPath('./');
    resourceLoader.getConfigLoader();
    resourceLoader.load('./a');

    let beanFactory: BeanFactory = applicationContext.getBeanFactory(); // $ExpectType BeanFactory
    let beanFactorySame = bearcat.getBeanFactory();                     // $ExpectType BeanFactory
    if (beanFactory !== beanFactorySame) {
        return;        // should not run here!
    }

    beanFactory.getBean('testId');
    beanFactory.getBeanProxy('testId');
    beanFactory.getModelProxy('mId');
    beanFactory.getConstraint('cId');
    beanFactory.setParentBean('testParentBean');
    beanFactory.registerBeans({});
    beanFactory.registerBean('testNewId', {});
    beanFactory.registerModel('testId', 'mNewId', {});
    beanFactory.registerConstraint('testId', 'cNewId', {});
    beanFactory.preInstantiateSingletons();
    beanFactory.addBeanPostProcessor({postProcessBeanFactory: EF});
    beanFactory.getBeanPostProcessors();
    beanFactory.isSingleton('testId');
    beanFactory.isPrototype('testId');
    beanFactory.containsBean('testId');
    beanFactory.getBeanFunction('testId');
    beanFactory.setBeanFunction('testId', EF);
    beanFactory.removeFunction('testId');
    beanFactory.getInitCb('testId');
    beanFactory.setInitCb('testId', EF);
    beanFactory.getBeanDefinition('testId');
    beanFactory.getBeanDefinitions();
    beanFactory.removeBeanDefinition('testId');
    beanFactory.containsBeanDefinition('testId');
    beanFactory.getAspects(); // $ExpectType object[]
    beanFactory.getModelDefinition('mId');
    beanFactory.getModelDefinitions();
    beanFactory.getConstraintDefinition('cId');
    beanFactory.setTableModelMap('tId', {});
    beanFactory.getModelDefinitionByTable('tId');

    let moduleFactory: ModuleFactory = applicationContext.getModuleFactory();
    moduleFactory.define('mId', {});
    moduleFactory.require('mId');

    beanFactory.destroyBean('testId', {});
    beanFactory.destroySingleton('testNewId');
    beanFactory.destroySingletons();
    beanFactory.destroyBeanFactory();
    applicationContext.closeBeanFactory();
    applicationContext.cancelRefresh();
    applicationContext.destroy();
    bearcat.stop();
});

bearcat.async('test', () => {});

