<?php
namespace onix\assets;

use yii\web\JqueryAsset;

class Select2VendorAsset extends AssetBundle
{
    /**
     * @inheritdoc
     */
    public $depends = [
        JqueryAsset::class,
    ];

    public function init()
    {
        $this->setSourcePath('@bower/select2/dist');
        $this->setupAssets('css', ['css/select2']);
        $this->setupAssets('js', ['js/select2.full']);

        parent::init();
    }
}
