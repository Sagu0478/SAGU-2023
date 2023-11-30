'use strict';

const path = require('path');
const fs = require('fs');

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {

    // only perform setup in dev enviornment
    if (process.env.NODE_ENV != 'development') return;
    strapi.log.info("populating development enviornment");

    // Check if admin user exists 
    const hasAdmin = await strapi.service("admin::user").exists();
    let superAdminRole = await strapi.service("admin::role").getSuperAdmin();

    // create admin if one does not exist
    if (!hasAdmin || !superAdminRole) {
      strapi.log.info("creating new admin");

      await strapi.service('admin::user').create({
        username: 'admin',
        email: 'admin@email.com',
        blocked: false,
        isActive: true,
        confirmed: true,
        password: 'admin',
        roles: superAdminRole ? [superAdminRole.id] : [],
      });
    } else {
      strapi.log.info("existing admin detected");
    }


    strapi.log.info("making GET routes findable");

    const roles = await strapi
      .service("plugin::users-permissions.role")
      .find();

    const _public = await strapi
      .service("plugin::users-permissions.role")
      .findOne(roles.filter((role) => role.type === "public")[0].id);

    // Iterate over all api content-types
    Object.keys(_public.permissions)
      .filter(permission => permission.startsWith('api'))
      .forEach(permission => {
        const controller = Object.keys(_public.permissions[permission].controllers)[0];

        // Enable find
        _public.permissions[permission].controllers[controller].find.enabled = true;

        // Enable findOne if exists
        if (_public.permissions[permission].controllers[controller].findOne) 
          _public.permissions[permission].controllers[controller].findOne.enabled = true;
        
      });

    await strapi
      .service("plugin::users-permissions.role")
      .updateRole(_public.id, _public);
  


    strapi.log.info("initializing single types");

    // function to create single types if necessary
    async function initializeSingleType(apiId, defaultData) {
      const existing = await strapi.entityService.findMany(apiId);
      if (existing === null) {
        await strapi.entityService.create(apiId, { data: defaultData });
      }
    }
  
    // Default data for 'our-story'
    const ourStoryDefaults = {
      About_Us: 'Established in June 2019, inspired by the rich tapestry of Asian street foods and the vibrant flavors of Filipino foods, we embarked on a mission to create a haven for food enthusiasts. At Sagu Bubble Tea, we take pride in offering an eclectic fusion of authentic Filipino delicacies and the latest trends in milk tea and bubble tea concoctions. Our carefully curated menu features a tantalizing array of delectable delights, infused with the essence of traditional flavors, alongside an exciting lineup of refreshingly innovative tea blends.',
      Our_Goal: 'Every sip and every bite at Sagu Bubble Tea is a celebration of our passion for culinary excellence and our commitment to serving you nothing short of the best. With each visit, prepare to embark on a journey that tantalizes your taste buds and transports you to the bustling streets of Asia, all within the cozy ambiance of our welcoming establishment.',
    };
  
    // Default data for 'store-hour'
    const storeHourDefaults = {
      monday: '11:00am - 8:00pm',
      tuesday: '11:00am - 8:00pm',
      wednesday: '11:00am - 8:00pm',
      thursday: '11:00am - 8:00pm',
      friday: '11:00am - 8:00pm',
      saturday: '11:00am - 8:00pm',
      sunday: '11:00am - 8:00pm',
    };
  
    // Initialize each single type
    await initializeSingleType('api::our-story.our-story', ourStoryDefaults);
    await initializeSingleType('api::store-hour.store-hour', storeHourDefaults);


    // // Delete media files
    // strapi.log.info("deleting uploaded assets");
    // const files = await strapi.entityService.findMany('plugin::upload.file', {});
    // for (const file of files) {
    //   await strapi.entityService.delete('plugin::upload.file', file.id);
    // }
    // const uploadsPath = path.join(__dirname, '../public/uploads');
    // fs.readdir(uploadsPath, (err, files) => {
    //   if (err) throw err;
  
    //   for (const file of files) {
    //     fs.unlink(path.join(uploadsPath, file), err => {
    //       if (err) throw err;
    //     });
    //   }
    // });

    // Read all files in the images folder
    const imagesPath = path.join(__dirname, './dev-assets/');
    const imageFiles = fs.readdirSync(imagesPath).map(fileName => {
      return {
        path: path.join(imagesPath, fileName),
        name: fileName
      };
    });

    // upload necessary images
    strapi.log.info("uploading dev assets");
    for (const file of imageFiles) {
      // Check if the image is already uploaded by name
      const existingFiles = await strapi.entityService.findMany('plugin::upload.file', {
        filters: { name: file.name }
      });
  
      if (existingFiles.length === 0) {
        // If not, upload the image
        await strapi.plugin('upload').service('upload').upload({
          files: {
            path: file.path,
            name: file.name,
            type: 'image/jpeg'
          },
          data: { fileInfo: { alternativeText: 'Image description', caption: 'Image caption' } },
        });
      }
    }


    const menuItemsData = [
      {
        Title: 'Bubble Tea 1',
        Price: 1200,
        Type: 'Bubble Tea',
        Hide: false,
      },
      {
        Title: 'Bubble Tea 2',
        Price: 900,
        Type: 'Bubble Tea',
        Hide: false,
      },
      {
        Title: 'Bubble Tea 3',
        Price: 1400,
        Type: 'Bubble Tea',
        Hide: true,
      },
      {
        Title: 'Bubble Tea 4',
        Price: 1995,
        Type: 'Bubble Tea',
        Hide: false,
      },
      {
        Title: 'Bubble Tea 5',
        Price: 1499,
        Type: 'Bubble Tea',
        Hide: false,
      },
      {
        Title: 'Food 1',
        Price: 100,
        Type: 'Other',
        Hide: false,
      },
      {
        Title: 'Food 2',
        Price: 299,
        Type: 'Other',
        Hide: false,
      },
    ];


    // // delete menu items
    // strapi.log.info("clearing menu items from database");
    // const menuItems = await strapi.entityService.findMany('api::menu-item.menu-item', {});
    // for (const menuItem of menuItems) {
    //   await strapi.entityService.delete('api::menu-item.menu-item', menuItem.id);
    // }

  
    // add menu items
    strapi.log.info("creating dev menu items");
    for (const item of menuItemsData) {
      // Check if the menu item already exists
      const existingItems = await strapi.entityService.findMany('api::menu-item.menu-item', {
        filters: { Title: item.Title },
      });
    
      if (existingItems.length === 0) {
        // Ensure the title exists and is a string
        if (typeof item.Title === 'string') {
          // Generate the image name based on the title
          const imageName = item.Title.replace(/ /g, '') + '.jpg';
    
          // Find the corresponding image for the menu item
          const [image] = await strapi.entityService.findMany('plugin::upload.file', {
            filters: { name: imageName },
          });
    
          // Create a new menu item with the image
          await strapi.entityService.create('api::menu-item.menu-item', {
            data: {
              ...item,
              Photo: image ? image.id : null, // Link the image by its ID
            },
          });
        } else {
          console.error('Invalid title for menu item:', item);
        }
      }
    }

    const promoItems = [
      {
        Title: 'Promo 1',
        Description: 'descrtiption',
        Terms: 'terms for promo 1',
      },
      {
        Title: 'Promo 2',
        Description: 'long description long description long description long description long description long description long description long description long description long description long description long description long description long description long description ',
        Terms: 'terms for promo 2',
      },
    ];

    // add promo items
    strapi.log.info("creating dev promos");

    for (const promoItem of promoItems) {
      // Check if the promo item already exists
      const existingPromos = await strapi.entityService.findMany('api::promo.promo', {
        filters: { Title: promoItem.Title },
      });
    
      if (existingPromos.length === 0) {
        // Ensure the title exists and is a string
        if (typeof promoItem.Title === 'string') {
          // Generate the image name based on the title
          const imageName = promoItem.Title.replace(/ /g, '') + '.jpg';
    
          // Find the corresponding image for the promo item
          const [image] = await strapi.entityService.findMany('plugin::upload.file', {
            filters: { name: imageName },
          });
    
          // Create a new promo item with the image
          await strapi.entityService.create('api::promo.promo', {
            data: {
              ...promoItem,
              Image: image ? image.id : null, // Link the image by its ID
            },
          });
        } else {
          console.error('Invalid title for promo item:', promoItem);
        }
      }
    }

    // initial setup finished
    strapi.log.info("database setup complete");
  },
};